---
id: 0cee147e-d2a5-5b20-95c6-ed975c982e53
page-type-slug: command
title: "Check"
slug: check
path: worktree check
domain-parent-slug: domain/ops-worktree
required-reading-slugs:
  - page-type/command
---

# Definition

- **Check** — a worktree judged by the checks that worktree defines.

# Design

A check runs the worktree's own code rather than the code of the checkout it was invoked from.

Every check stating it runs on a worktree runs, whatever the change reaches.

A worktree holding uncommitted work is judged and nothing is written onto its page.
