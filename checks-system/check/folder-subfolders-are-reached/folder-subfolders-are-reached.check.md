---
id: 01a04458-8a76-743d-b3a7-5a66604c8569
page-type-slug: check
title: "Folder subfolders are reached"
slug: folder-subfolders-are-reached
needs: tree
cached: false
check-on-patch: false
check-on-worktree: false
check-on-audit: false
---

# Definition

- **Folder subfolders are reached** — fails a folder holding code beneath its subfolders that nothing outside it enters.

# Design

`editor-extension` and everything under it is outside this check.
