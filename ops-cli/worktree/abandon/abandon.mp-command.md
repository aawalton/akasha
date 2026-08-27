---
id: 9db12eb9-e2ef-5005-9a39-2a1b5635632b
page-type-slug: mp-command
title: "Abandon"
slug: abandon
path: worktree abandon
domain-parent-slug: mp-namespace/worktree
required-reading-slugs:
  - page-type/mp-command
---

# Definition

- **Abandon** — a worktree given up, with its tree, branch and page taken away together.

# Design

Every reading happens before any act, so a refusal leaves the worktree as it was.

A worktree holding uncommitted work is refused, and no flag waives it.

A commit that never landed is printed and then dropped.

Landedness is read by patch rather than by ancestry.

The page is taken away only where nothing else is left standing.

A worktree is never given up by a caller standing inside it.
