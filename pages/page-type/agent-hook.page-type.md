---
id: 01a00669-7f18-7000-bf7b-f9faf5412936
page-type-slug: page-type
title: "Agent hook"
extends-slug: domain
files: instructions:**/*.agent-hook.md
body-shape-slug: domain
slug: agent-hook
domain-parent-slug: domain/hook
required-reading-slugs:
  - domain/agent-harness
  - ops-command/ops-seat-fleet-restart
---

# Definition

- **Agent hook** — a hook run at a fixed point in an agent's turn.

# Design

A hook that breaks admits the act it would have refused.

A hook is registered in a settings file, not by standing in a directory.

A hook's script is read afresh each time it fires.

A hook's registration is read once, when its seat starts.

A supervisor restart reads it again.

A hook and a gate may refuse the same act, and the doubling is deliberate.

A hook refuses two ways: a payload on exit 0, or a blocking exit 2.

A hook at session start refuses nothing; what it prints becomes context.

# Intent

Every agent hook is instant.

The hooks firing on one event are lagging together.
