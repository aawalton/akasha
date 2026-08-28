---
id: 01a045a9-aa50-7000-a9d1-3f6088b88a4c
page-type-slug: check
title: "Require import extension"
slug: require-import-extension
needs: file
cached: false
check-on-patch: true
check-on-worktree: false
---

# Definition

- **Require import extension** — fails a relative import written without the extension of the file it names.

# Design

A specifier naming a package rather than a path is not judged.

A file in a project that emits JavaScript is not judged.

A generated file is outside this check.
