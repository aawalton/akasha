---
id: 869fb7d8-ceb5-53d7-9dee-6fe4380f793e
page-type-slug: page-type
title: "Seat"
extends-slug: agent
files: akasha:agent/seat/**/*.seat.md
body-shape-slug: empty
slug: seat
domain-parent-slug: domain/agent-definitions
settled: true
mortal: true
---

# Definition

- **Seat** — a place an agent works from.

# Design

A seat's page stands while an agent is present in it, and goes when none is.

A seat's attributes are persona, domain and role.

What a seat holds is either declared of it or observed of it.

A seat states its attributes and assignments through `ops seat set`.

A seat's attributes can be re-stated without making it another seat.

A seat's file stem is its seat name.

# Intent

A seat is a tmux session.

Every tmux session is a seat.

A seat outlives every editor showing it.

