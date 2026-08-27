---
id: 99afd36a-cc5a-597c-bc19-bf3f1ff16c00
page-type-slug: check
title: "File length"
slug: file-length
needs: file
cached: false
check-on-patch: true
check-on-worktree: false
---

# Definition

- **File length** — fails an authored file over the ceiling.

# Design

A file whose file kind carries bytes is not judged.

A file of a kind stating it is unsplittable is not judged.

A page of a type stating it is unsplittable is not judged.

A file under a `dirty` folder is not judged.

A file under a `data` folder is not judged.
