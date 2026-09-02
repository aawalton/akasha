---
id: b2571a41-ff7d-525e-9a01-a00a3fb57cc0
page-type-slug: old-ops-command
title: "Ops worktree merge"
slug: ops-worktree-merge
domain-parent-slug: domain/ops-worktree
required-reading-slugs:
  - page-type/old-ops-command
command-path: ops-cli/worktree/merge/merge.command.code.attachment.ts
path: worktree merge
irreversible: false
---

# Definition

- **Ops worktree merge** — a worktree whose checks passed, landed on main and taken away.

# Help

Land a worktree whose checks passed on main, and take the tree away.

A worktree lands only where its page states the commit its checks passed at and the tree still stands there. A tree that moved after it went green is refused rather than merged, because the commit that passed is not the commit that would land.

MAIN MOVING UNDERNEATH IS NOT A REFUSAL. The fold is made against main as it stands, and what that race lets through is caught by the next run of checks rather than by holding every merge until nothing else is landing.

After main moves, its packages are linked again from the lockfile the landed commit carries. A commit declaring a workspace this checkout never installed leaves a tree where that workspace is declared, locked and resolves to nothing, and git is happy throughout.

The tree, its branch and its page go together once main holds the commit. What is left standing is named rather than swallowed.

NOTHING STAMPS `passed-commit` TODAY, so this command refuses every call. `ops worktree check`, which is what stamped it, went out with the old check system on 2026-08-29 in `dff2ff75e2`, and `ops worktree start` writes a worktree page carrying no such field. The refusal you get names that command, and running it will tell you there is no such command. Until something stamps the field again, a worktree is landed by hand or given up with `ops worktree abandon`.
