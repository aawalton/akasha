---
id: c9bd1175-8d22-46b9-a241-944bbef90ce2
page-type-slug: check
title: "Links resolve"
slug: links-resolve
needs: tree
check-on-patch: true
check-on-worktree: false
---

# Definition

- **Links resolve** — fails a change leaving a markdown link pointing at nothing, at either end.

# Design

A link breaks three ways: the file goes, the heading it names goes, or the words it quotes change.

Both ends of a link are judged, the links a change carries and the links reaching what it changes.

The links reaching a file are read from the relation index rather than by searching the repository.

A link naming a heading or a quote is judged against the body, so the pages holding those links are read.

A file under a `dirty` folder is not judged.

A page of a type whose body came from elsewhere is not judged.

A link with a mortal page at either end is not judged.
