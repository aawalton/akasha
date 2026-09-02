---
id: 8c4658ee-c908-5bc6-a86e-5530eb6eab61
page-type-slug: old-ops-command
title: "Ops worktree abandon"
slug: ops-worktree-abandon
domain-parent-slug: domain/ops-worktree
required-reading-slugs:
  - page-type/old-ops-command
command-path: ops-cli/worktree/abandon/abandon.command.code.attachment.ts
path: worktree abandon
irreversible: true
---

# Definition

- **Ops worktree abandon** — a worktree given up, with its tree, branch and page taken away together.

# Help

Give up a worktree, leaving no tree, branch or page behind.

EVERY READING HAPPENS BEFORE ANY ACT, so the first refusal leaves the worktree exactly as it was. What is read is printed either way, so a dry run and a refusal show the same thing.

UNCOMMITTED WORK IS NEVER GIVEN UP. A tree holding changes of its own, tracked or not, is refused, because that work has no other copy anywhere. A commit that never landed is a different thing: it was written down, this prints every one of them, and then drops them, which is what giving up a worktree means.

Landedness is read with `git cherry` rather than by ancestry, so a commit that landed as a cherry-pick or through a rebase reads as landed rather than as work about to be lost.

The page goes last and only where nothing else is left standing. A page removed while its tree or branch survives is a worktree nothing states, which nothing can then finish.
