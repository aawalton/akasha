---
id: 0cee147e-d2a5-5b20-95c6-ed975c982e53
page-type-slug: mp-command
title: "Check"
slug: check
path: worktree check
domain-parent-slug: mp-namespace/worktree
required-reading-slugs:
  - page-type/mp-command
---

# Definition

- **Check** — a worktree judged by the checks that worktree defines.

# Design

A check runs the worktree's own code rather than the code of the checkout it was invoked from.

Every check runs, whatever the change reaches.

A worktree holding uncommitted work is judged and nothing is written onto its page.
