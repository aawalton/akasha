---
id: 3247bd4f-4de9-5d4c-a2c3-68dd22f8f65c
page-type-slug: old-ops-command
title: "Ops worktree start"
slug: ops-worktree-start
domain-parent-slug: domain/ops-worktree
required-reading-slugs:
  - page-type/old-ops-command
command-path: ops-cli/worktree/start/start.command.code.attachment.ts
path: worktree start
irreversible: false
---

# Definition

- **Ops worktree start** — a worktree of akasha made for one seat to work in.

# Help

Start a worktree of akasha and work in it.

A worktree, its branch and its page carry one name made from the seq this takes, and they are taken away together at merge or at abandon. The seq is taken before anything else, so two starts at once are safe: the second reads a counter the first already moved. A start that dies after taking its seq leaves a number nothing used, which costs nothing, where two worktrees at one seq would cost the numbering itself.

The tree is given a `node_modules` of its own, each entry linked to the one beside it in this checkout. Without it the tree cannot run the repository's own code, so it could not be checked, and a worktree nothing can check is worth less than no worktree at all.
