---
page-type-slug: page-type
title: "Subagent"
id: 019ffe81-493b-7000-9996-a31336ea36a4
extends-slug: agent
files: akasha:agent/subagent/**/*.subagent.md
body-shape-slug: empty
slug: subagent
domain-parent-slug: page-type/agent
mortal: true
---

# Definition

- **Subagent** — an agent a seat runs with the Agent tool, stating no attributes of its own.

# Design

A subagent is not a seat.

A subagent reads for its seat's domain, the default persona and the default role.

A subagent may carry fewer tools than the seat that ran it.

A message to a subagent arrives at its next tool round.

A message to a subagent leaves no row, so nothing addressing a row reaches one.

A message to a subagent dies with the session that carried it.

# Intent

A subagent's required reading follows the kind it was dispatched as.
