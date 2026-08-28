---
id: 01a04a4d-b05d-7458-b8dc-4ac6fd33f3ba
page-type-slug: check
title: "Page property has its file"
slug: page-property-has-its-file
needs: tree
check-on-patch: true
check-on-worktree: false
---

# Definition

- **Page property has its file** — fails a page stating a property of kind file whose file is not there or is empty.

# Design

Only a file under the `akasha` folder is judged.

The tree this judges is the one the change would leave, never the one on disk.

The resolver here is the one the write path uses; there is no second index.

A property's file is looked for beside its page, under the name `akasha-file` states.

A property whose stated value is not text is outside this check.

A corpus that will not load is outside this check.
