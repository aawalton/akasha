---
id: d5a9e7b4-9a07-5634-a221-d2a1371c6934
page-type-slug: domain
title: "Seat turn end error"
slug: seat-turn-end-error
domain-parent-slug: domain/seat-turn-end-source
---

# Definition

- **Seat turn end error** — a turn ended by an error rather than by the agent.

# Design

No hook runs at an error turn end.

Nothing approves or refuses an error turn end, and the agent goes idle.

Only the transcript records that one happened.

# Intent

Every error turn end is reported.
