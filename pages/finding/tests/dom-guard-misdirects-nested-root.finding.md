---
id: f339d821-b28d-5dbc-9974-b674d040e6a4
slug: dom-guard-misdirects-nested-root
page-type-slug: finding
title: "Dom guard misdirects nested root"
domain-slug: domain/global
---

# Claim

The root component-test DOM guard's remedy misdirects for a component test under a nested build-root: it sends the reader to the nearest `package.json` directory, which for `app-capacitor` is the directory that fails.

# Evidence

`packages/shared/utils/test/src/setup/component-dom-guard.ts:11` throws, for a repo-root run of any `*.component.test.*`:

```
Run it from the package directory:
  cd <package-dir> && bun test <path-relative-to-package>
...
The test itself is fine — it passes from its package directory.
```

`packages/alanwalton/web/app-capacitor/routes/page-detail.component.test.tsx` is a component test whose nearest ancestor `package.json` is `packages/alanwalton/web/app-capacitor/package.json`. That file declares itself "Build-root marker ONLY (not a workspace; absent from root package.json#workspaces)" and the directory has no `bunfig.toml`, so Bun loads no happy-dom preload there.

Reproduced, all three ways. From the repo root: the guard fires with the text above. From `packages/alanwalton/web/app-capacitor`, which is where "cd <package-dir>" sends you: seven failures, every one a bare `ReferenceError: document is not defined` out of `node_modules/@testing-library/react/dist/pure.js:256` — the exact error the guard exists to replace, now with the guard not loaded to explain it. From `packages/alanwalton/web`, the enclosing workspace: seven pass.

So the guidance is right for a test whose package directory is a workspace and wrong for one under a nested build root, and the closing line "The test itself is fine — it passes from its package directory" is false as read for this file. A reader who follows the remedy lands in a worse state than the one the guard caught them in, having been told the invocation was the whole problem.

CI is unaffected: it runs from workspace directories, and `packages/alanwalton/web/bunfig.toml` carries the preload. Found while ingesting `dirty/knowledge/component-test-dom.md`, which describes the guard and does not have this.
