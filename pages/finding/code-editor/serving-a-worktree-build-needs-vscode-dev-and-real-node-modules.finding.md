---
id: d2dd1f05-d345-53a5-80fe-87c59f0b2049
page-type-slug: finding
title: "Serving a worktree build needs vscode dev and real node modules"
domain-slug: domain/code-editor
---

# Claim

Running the code editor's `out/server-main.js` without `VSCODE_DEV=1` serves the built-mode workbench page, which asks for a bundled stylesheet a transpile build never produces — so the workbench never boots and fails as a wall of "CSS served as a module script" errors that read as a broken build rather than a wrong launch flag. A worktree of that repo also needs real copies of its three `node_modules` directories rather than symlinks.

# Evidence

`isBuilt` is `!process.env['VSCODE_DEV']`. Built mode serves `workbench.html`, which wants a bundled `workbench.css`; `workbench-dev.html` carries the import map that loads the individual stylesheets properly. A `build/next/index.ts transpile` build produces neither the bundle nor any `.css.js` wrapper, so every `.css` import arrives at the browser with `Content-Type: text/css` and strict MIME checking rejects it.

Measured twice by the lead on the same host. Without the variable, three separate launches never built a `.monaco-workbench` element — one from a worktree and one from the tree both of Alan's editors run from, which rules out the build being at fault. Two false trails were followed and neither held: a fresh `--user-data-dir` (the lead had recorded this as the cause and told two seats so, wrongly), and `@vscode/test-web`, which cannot serve this tree at all because it requires a compiled `build/lib/extensions.js` that no longer exists there. With `VSCODE_DEV=1` set and nothing else changed, the workbench booted on the first attempt and was driven for a full verification.

Separately, a top-level `node_modules` SYMLINK into the main checkout let the server bind its port but the page never came up; the delivering seat reports the boot error as `TypeError: minimist is not a function`, from root dependencies being shortcircuited to commonjs file URLs under the symlink. `cp -a` of `node_modules`, `remote/node_modules` and `build/node_modules` reflinks on this filesystem and takes about a second.

NOT MEASURED: whether the desktop application path needs the variable (only the served workbench was tested), and whether the symlink failure would also occur with only the two nested `node_modules` symlinked. The lead reproduced the `VSCODE_DEV` half directly and takes the `minimist` half from the delivering seat's report.
