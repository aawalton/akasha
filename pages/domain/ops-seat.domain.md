---
id: 10c0b55f-f5cc-58c8-a9d1-705ea53b7467
page-type-slug: domain
title: "Ops seat"
slug: ops-seat
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
  - page-type/seat
---

# Definition

- **Ops seat** — the commands whose subject is a seat.

# Design

A command that ends a seat ends its tmux session.

A command that would end a seat's working subagents refuses, and names the flag that forces it.

# Intent

Every command whose subject is a seat is invoked through this namespace.
