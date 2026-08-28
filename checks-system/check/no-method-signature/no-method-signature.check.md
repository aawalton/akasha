---
id: 01a04a6d-dde3-75d6-a6ce-8c653b8fea5b
page-type-slug: check
title: "No method signature"
slug: no-method-signature
needs: file
cached: false
check-on-patch: true
check-on-worktree: false
---

# Definition

- **No method signature** — fails a source file carrying a method signature in an interface or a type literal.

# Design

No call, construct or index signature is judged.

A declaration file is outside this check.

A generated file is outside this check.

A file under a `__fixtures__` directory is outside this check.
