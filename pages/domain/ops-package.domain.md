---
id: 89470240-7586-524a-b288-b68d77212aa5
page-type-slug: domain
title: "Ops package"
slug: ops-package
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
---

# Definition

- **Ops package** — the commands that add a workspace package to akasha and move or rename one already there.

# Design

Each takes a change branch's seq rather than a path, and runs inside that branch's worktree.

Each writes the whole change, then commits everything standing in the worktree, and leaves it dirty where it failed partway.

Neither checks what it wrote.
