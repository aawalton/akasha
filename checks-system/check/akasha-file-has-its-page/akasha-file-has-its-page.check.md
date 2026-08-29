---
id: 01a04ad6-cca0-7e6a-803c-568f130c50c8
page-type-slug: check
title: "Akasha file has its page"
slug: akasha-file-has-its-page
needs: tree
check-on-patch: true
check-on-worktree: false
---

# Definition

- **Akasha file has its page** — fails a file under `akasha` that no page claims as its own or as one property's.

# Design

Only a file under the `akasha` folder is judged.

The tree this judges is the one the change would leave, never the one on disk.

The resolver here is the one the write path uses; there is no second index.

A file naming a page type nothing declares is claimed by nothing.

A corpus that will not load fails this check.

A corpus-level failure names the folder, never a file.

An absent `akasha` folder is nothing to judge.
