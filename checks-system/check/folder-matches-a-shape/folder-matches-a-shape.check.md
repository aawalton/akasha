---
id: 01a04477-ae9c-7000-936f-57934af66e0a
page-type-slug: check
title: "Folder matches a shape"
slug: folder-matches-a-shape
needs: tree
cached: false
check-on-patch: false
check-on-worktree: false
check-on-audit: false
---

# Definition

- **Folder matches a shape** — fails a folder matching none of the folder shapes.

# Design

The shapes are `single-entry`, `pages-of-one-type` and `subfolders-only`.

A folder is judged on the files sitting in it, and each subfolder is judged as a folder of its own.

A failure names the shape the folder came nearest to and what disqualified it from each.

`editor-extension` and everything under it is outside this check.

What is imported from outside is read off the import graph, which follows a specifier written in a `.ts` file to a `.ts` file and no other pair.
