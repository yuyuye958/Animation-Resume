let css1 = `/*
* 面试官您好
* 我是叶晓宇
* 下面我将向您展示制作这个会动的简历的过程
*/

/* 首先给简历全局加个过渡，让接下来的变化变得平滑 */
* {
    transition: all .8s;
}

/* 再做些其他准备 */
body {
  background: #455A64;
}
.wrapper{
  padding: 16px;
}
#code {
  border: 1px solid #aaa;
  padding: 16px;
  background: #CFD8DC;  
}

/* 我需要将我的代码高亮 */
.token.comment, .token.punctuation {
  color: #757575;
}
.token.selector {
  color: #690;
}
.token.property {
  color: #905;
}

/* 给它们来个呼吸的特效 */
#code{
  animation: breath 3s infinite alternate-reverse;
}

/* 现在正式开始写简历 */
/* 让代码腾出一些的位置给我的简历 */
#code {
  width: 40%;
}

/* 我还需要一张白纸 */
#paper {
  flex: 1;
  margin-left: 20px;
  background: #fdfdfd;
  white-space: pre-wrap;
  padding: 20px 30px;
}

/* 接下来，请看右边 */

`;

let css2 = `
/* 
 * 这个 Markdown 的格式看起来太奇怪了
 * 所以我使用了一个第三方库：marked.js
 * (https://github.com/markedjs/marked)
 * 它能编译 Markdown 代码为 HTML 并直接显示
*/
`;

let resume = `
## 自我介绍
叶晓宇
23岁 | 男 | 本科 | 上海
上海金融学院 计算机科学与技术专业
我的[Github](https://github.com/yuyuye958)和[博客](https://yuyuye958.github.io/)
应聘岗位 | **前端开发工程师**


## 专业技能
### HTML5, CSS3 & JavaScript
- 能够使用原生 JavaScript 独立制作精美网页
- 掌握 HTML5 如 canvas 、 nav 等语义化标签及 WebStorage API 等
- 掌握 CSS3 动画、过渡、弹性盒子布局、媒体查询等响应式设计常用技术

### Vue
- 有 Vue 的开发经历，理解 XXXXXXXXXX 等
- 有移动端开发的经历XXXXXXXXXXXXX

### 移动端开发
- 会使用 REM 、 vw / vh 、 媒体查询等技术制作适配手机设备的页面

### Node.js
- XXXXXXXXXXXXXXXXXXXXX

### Webpack
- 有使用 Webpack 打包项目的经验，了解其管理资源的方法，如 css-loader 、 file-loader 等

### 其他
- 熟悉 jQuery 常用 API ，如 DOM 操作、特效、事件等。曾使用原生 JavaScript 封装简易版的 $.ajax()
- 掌握 Scss 、 Less 的使用，理解嵌套规则、父选择器 & 、变量、混合等的使用
- 理解 MVC 、 MVVM 思想，掌握 HTTP 基础等

## 项目介绍
### 导航
- 关键词：\`JavaScript\`、\`CSS3\`
- 源码链接：xxx
- 预览链接：xxx
- 描述：xxx

### 画板
- 关键词：\`JavaScript\`、\`CSS3\`
- 源码链接：xxx
- 预览链接：xxx
- 描述：xxx

### 轮播
- 关键词：\`JavaScript\`、\`CSS3\`
- 源码链接：xxx
- 预览链接：xxx
- 描述：xxx

## 联系方式
- Email：yuyuye958@qq.com
- Telephone：1234567890
`;

let css3 = `

/* 再稍微美化一下我的简历 */
#paper{
  animation: breath 3s infinite alternate-reverse;
}
#paper p {
  line-height: 28px;
}
#paper a {
  text-decoration: none;
}
#paper h2 {
  font-size: 23px;
  border-bottom: 1px solid #455A64;
  padding-bottom: 8px;
}
#paper h3 {
  display: inline-block;
  font-size: 16px;
}
#paper ul {
  padding-left: 20px;
  margin-bottom: -10px;
}
#paper li {
  margin-top: -10px;
}


/*
 * 这就是我的会动的简历
 * 期待您的联系
 *                _(:з」∠)_
*/


`;

writeCSS('', css1).then(() => {
	writeResume().then(() => {
		writeCSS(css1, css2)
			.then(() => {
				document.getElementById('paper').innerHTML = marked(resume);
			})
			.then(() => {
				writeCSS(css1 + css2, css3);
			});
	});
});

// 把代码写到style和#code标签里
function writeCSS(origin, code) {
	let n = 0;
	let domcode = document.querySelector('#code');
	return new Promise((resolve, reject) => {
		let IntervalID = setInterval(() => {
			domcode.innerHTML = Prism.highlight(origin + code.substr(0, n), Prism.languages.css, 'css');
			codeStyle.innerHTML = origin + code.substr(0, n);
			domcode.scrollTop = domcode.scrollHeight; // 让domcode自动滚动到底部
			n++;
			if (n === code.length) {
				window.clearInterval(IntervalID);
				resolve.call(undefined);
			}
		}, 20);
	});
}

// 把代码写到#paper里
function writeResume() {
	let n = 0;
	return new Promise((resolve, reject) => {
		let IntervalID = setInterval(() => {
			paper.innerHTML = resume.substr(0, n);
			paper.scrollTop = paper.scrollHeight; // 让paper自动滚动到底部
			n++;
			if (n === resume.length) {
				window.clearInterval(IntervalID);
				resolve.call(undefined);
			}
		}, 10);
	});
}
