---
id: 01a04035-32d6-7000-aadc-fd0762c55606
page-type-slug: check
title: "Folder shape"
slug: folder-shape
needs: tree
cached: false
check-on-patch: false
check-on-worktree: false
---

# Definition

- **Folder shape** — fails a folder that reads as more than one thing.

# Design

`editor-extension` and everything under it is outside this check.

A folder with no code beneath its subfolders is outside this check.
