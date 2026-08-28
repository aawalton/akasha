---
id: 7b05db85-fa23-5d2e-bb7c-02ffa67455ea
page-type-slug: check
title: "Relation resolves"
slug: relation-resolves
needs: tree
check-on-patch: true
check-on-worktree: false
---

# Definition

- **Relation resolves** — fails a change after which a page relation names nothing.

# Design

The tree judged is the one the change would leave, not the one that stands.

A page the change adds counts as a bearer, and a page it removes does not.

A relation whose property is marked `may-be-gone` is outside this check.

A relation with a mortal page at either end is not judged.

Only pages in this repository are read for the relations they carry.

A relation that named nothing before the change is not reported.
