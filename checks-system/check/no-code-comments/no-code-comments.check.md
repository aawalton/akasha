---
id: 01a04874-0d42-7000-9b14-b5b14308bd0b
page-type-slug: check
title: "No code comments"
slug: no-code-comments
needs: file
cached: false
check-on-patch: false
check-on-worktree: false
---

# Definition

- **No code comments** — fails a source file carrying a comment that is none of the code comment forms.

# Design

A file whose kind nothing here reads for comments is not judged.

A generated file is outside this check.

A file under a `__fixtures__` directory is outside this check.

The forms are read from the list page as it lies on disk, so a change to that list binds once it lands.
