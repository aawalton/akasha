---
id: 01a048c5-3df5-75b0-9a1e-b5f4a17777a6
page-type-slug: check
title: "No enum or namespace"
slug: no-enum-or-namespace
needs: file
cached: false
check-on-patch: true
check-on-worktree: false
---

# Definition

- **No enum or namespace** — fails a source file declaring an `enum` or a named `namespace`.

# Design

A module named by a string is not a namespace.

A declaration file is outside this check.

A generated file is outside this check.

A file under a `__fixtures__` directory is outside this check.
