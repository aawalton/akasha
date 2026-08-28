---
id: 01a048be-2633-7d32-bd05-265a2b107a22
page-type-slug: check
title: "No class"
slug: no-class
needs: file
cached: false
check-on-patch: true
check-on-worktree: false
---

# Definition

- **No class** — fails a source file declaring a `class` that is neither an error type nor a React error boundary.

# Design

A class extending `Error` is not judged.

A React error boundary is not judged.

A class expression is judged wherever a declaration would be.

A declaration file is outside this check.

A polyfill under `lua-compiler/lualib/src/` is outside this check.

A generated file is outside this check.

A file under a `__fixtures__` directory is outside this check.
