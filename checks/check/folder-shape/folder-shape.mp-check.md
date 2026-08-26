---
id: 01a04035-32d6-7000-aadc-fd0762c55606
page-type-slug: mp-check
title: "Folder shape"
slug: folder-shape
needs: tree
cached: false
check-on-patch: false
---

# Definition

- **Folder shape** — fails a folder that reads as more than one thing.

# Design

`editor-extension` and everything under it is outside this check: `package.json` enters it at its `main` rather than at an import, so no import could reach into it.
