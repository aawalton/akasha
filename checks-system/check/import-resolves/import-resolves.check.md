---
id: 01a04614-ae54-7000-953a-5a03a5892e3e
page-type-slug: check
title: "Import resolves"
slug: import-resolves
needs: file
cached: false
check-on-patch: false
check-on-worktree: false
---

# Definition

- **Import resolves** — fails an import naming a package in this repository that the package does not answer.

# Design

What answers is the exports map as the runtime reads it, not as the compiler does.

A specifier naming a path rather than a package is not judged.

A generated file is not judged.
