---
id: 072be340-90b8-58a4-b5b3-4e62a0ef57f9
page-type-slug: page-type
title: "Worktree"
extends-slug: page
files: memory:**/*.worktree.md
body-shape-slug: empty
slug: worktree
plural-slug: worktrees
domain-parent-slug: domain/master-plan-worktree
required-reading-slugs:
  - repo/memory-repo
  - domain/worktree
next-seq: 19491
mortal: true
---

# Definition

- **Worktree** — a checkout of akasha one seat works in.

# Design

A worktree, its branch and its page carry one name, made from its seq.

A worktree, its branch and its page are deleted together, at merge or at abandon.
