---
id: bf526db7-a8b5-5b3f-b99a-ec82744af4a7
page-type-slug: domain
title: "Worktree"
slug: worktree
domain-parent-slug: domain/repo-system
---

# Definition

- **Worktree** — a checkout of a repository with a working tree and a branch of its own.

# Design

Nothing removes a worktree but the merge or abandon a seat runs.

Bun does not resolve modules upward from a worktree into the host repo's `node_modules`.

Container steps may run as root and leave files `git worktree remove` cannot delete.
