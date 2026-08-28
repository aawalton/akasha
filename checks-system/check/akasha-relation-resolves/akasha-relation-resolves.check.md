---
id: 01a04a2c-9c3d-7e5d-b595-3544e0dce789
page-type-slug: check
title: "Akasha relation resolves"
slug: akasha-relation-resolves
needs: tree
check-on-patch: true
check-on-worktree: false
---

# Definition

- **Akasha relation resolves** — fails a relation naming no page, or a page of a type it does not admit.

# Design

The tree this judges is the one the change would leave, never the one on disk.

A page type admits every page type extending it, so a relation naming a page is answered by a domain.

A slug naming nothing refuses the whole corpus rather than one relation, because nothing downstream of it can be trusted.

The resolver here is the one the write path uses; there is no second index.

A repository other than akasha is outside this check.
