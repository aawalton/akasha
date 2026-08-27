---
id: a54e7428-a8b5-5f83-accd-6efe5860e5fa
page-type-slug: domain
title: "Ops dev-server"
slug: ops-dev-server
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
  - domain/dev-server
---

# Definition

- **Ops dev-server** — the commands that run an app from a branch's worktree and read the state each leaves.

# Design

No command waits for a server to answer on its port.

A state file outlives the process it names, and only `stop` removes one.
