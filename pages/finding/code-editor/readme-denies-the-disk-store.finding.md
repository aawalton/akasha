---
id: d3ea3b97-f098-5e0e-ac5b-447046ae0ac3
page-type-slug: finding
title: "Readme denies the disk store"
domain-slug: domain/code-editor
---

# Claim

The editor's README states that nothing is written to disk, and a data folder holding file history, workspace storage and global storage has stood on disk since 2026-08-04.

# Evidence

The README section `Everything it remembers lives in the browser, under one origin` opens `**There is no ~/.openvscode-server behind this.**` and states `Nothing is written to disk, so nothing can be copied in, nothing can be backed up`.

`~/.openvscode-server-dev` exists, created 2026-08-04, and holds `data/User/History`, `data/User/workspaceStorage`, `data/User/globalStorage`, `data/Machine` and `extensions`. The `-dev` suffix is why the stated path is absent: the unit sets `VSCODE_DEV=1`, and `server.main.ts` composes the folder from `product.serverDataFolderName` with that suffix applied, then creates the tree unconditionally at startup with `mkdirSync`.

The claim is true of USER SETTINGS and window state, which do live in browser storage keyed to the origin. It is false as written of the store as a whole.

The cost is not the inaccuracy, it is that the README is the artifact objective 4 of #18177 was to be met by — the thing that tells Alan where his state lives. Read literally it sends him looking for a path that cannot exist and tells him a backup is impossible, when file history and workspace storage are both on disk and both copyable.

Measured 2026-08-09 while verifying #18177. Two agents investigating this editor independently reported the stated path and both were wrong, because the README is what they read.
