---
id: c949fa97-ddb6-497d-9817-06730918a194
page-type-slug: page-property-definition
title: "Seat turn pending source"
defined-on-slug: page-type/seat
key: turn-pending-source
type: select(lower-kebab-case)
values:
  - running-task
  - live-child
  - open-question
  - send-in-flight
  - owed
  - none
uncommitted: true
computed: true
slug: seat-turn-pending-source
domain-parent-slug: domain/seat-turn-start-pending
---

# Definition

- **Seat turn pending source** — what will start a seat's next turn.
