---
id: 53a286f8-c4b8-55fc-b01f-de197a968eab
page-type-slug: mp-command
title: "Merge"
slug: merge
path: worktree merge
domain-parent-slug: domain/ops-worktree
required-reading-slugs:
  - page-type/mp-command
---

# Definition

- **Merge** — a worktree whose checks passed, landed on main and taken away.

# Design

A worktree lands only where the commit its checks passed at is the commit it stands at.

Main having moved underneath the fold is no refusal.

The checkout's packages are linked again from the landed commit's lockfile before the tree goes.

The tree, its branch and its page are taken away together once main holds the commit.

A worktree is never landed by a caller standing inside it.
