---
id: 01a04a1b-2317-7000-98de-309cd288c3a1
page-type-slug: check
title: "Id is a uuid version 7"
slug: id-is-a-uuid-version-7
needs: file
cached: false
check-on-patch: true
check-on-worktree: false
---

# Definition

- **Id is a uuid version 7** — fails a page whose stated id is not a uuid version 7 written in lower uuid.

# Design

Only a file under the `akasha` folder is judged.

A file that does not state its id as text is outside this check.
