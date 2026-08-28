---
id: ddd486f6-54ca-5bd9-8c95-6c2d7dca6ebe
slug: import-meta-empty-in-the-bundle
page-type-slug: finding
title: "Four akasha modules resolved their own root at import, and the CommonJS bundle they all reached killed the editor extension before it exported anything"
domain-slug: domain/editor-extension
---

# Claim

`import.meta` compiles to `{}` under esbuild's `cjs` format, so every top-level `import.meta.dir` in the extension's import graph evaluated to `undefined` while its module was still loading. Four sites did this, and each one threw before `activate` existed, so the extension host reported only `Activating extension vscode.ops failed`. Alan saw dead colours, every tab named `tmux`, and empty panels — one fault, three symptoms, none of them naming the bundle.

The four throw in the order the graph reaches them, so fixing one reveals the next and nothing says how many are left. It took four rebundles to find them all.

# Evidence

Read 2026-08-27 against akasha at head, bundling with `ops editor-extension bundle` and loading `dist/extension.js` under a stub `vscode` to see the throw the extension host swallows.

esbuild names every one of them at bundle time, as `▲ [WARNING] "import.meta" is not available with the "cjs" output format and will be empty [empty-import-meta]`, with file and line. That warning was printing on every bundle for as long as the log goes back and scrolled past unread, because the build exits 0 and writes the file. `bundle.ts:43` already raises `import-is-undefined` to an error; `empty-import-meta` was left at warning.

The four: `repo/roots/roots.ts:13` `HERE`, `page/index/place/place.ts:5` `AKASHA`, `checks-system/checks.ts:16` `createRequire`, and — surviving, because it is inside a function — `repo/push/push.ts:103`. `readouts/readout-catalog.ts:24` had already been written the safe way: read `AKASHA_ROOT`, fall back to `import.meta.dir`, throw a sentence naming the variable.

Two of the four refusals told a bundle to name its root in `AKASHA_ROOT`, and no bundle was setting it. The contract was written on the reading end only.

`checks-system/checks.ts` is in the extension's graph at all only transitively. The extension runs no check.

Not measured: whether anything else in this repository is bundled to `cjs`, and so shares the exposure.
