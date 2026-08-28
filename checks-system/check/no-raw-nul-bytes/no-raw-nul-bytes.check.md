---
id: 01a048da-f94c-7f27-b392-5ae18e447341
page-type-slug: check
title: "No raw NUL bytes"
slug: no-raw-nul-bytes
needs: file
cached: false
check-on-patch: true
check-on-worktree: false
---

# Definition

- **No raw NUL bytes** — fails a text file carrying a raw NUL byte.

# Design

A file kind declaring `binary: true` is not judged.

Nothing is exempt for being generated or under a `__fixtures__` directory.

A file carrying more than one NUL is reported at the first, with the count.
