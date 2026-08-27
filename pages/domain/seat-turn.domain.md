---
id: 804f8165-71c1-5b53-833a-c376770005d8
page-type-slug: domain
title: "Seat turn"
slug: seat-turn
domain-parent-slug: domain/seat-observation
required-reading-slugs:
  - domain/agent-turn
settled: true
---

# Definition

- **Seat turn** — whether an agent in a seat is working.

# Design

A turn end keeps its reading and its turn start source on the seat.

What a turn end keeps is observed rather than stated, and stands only while its seat is idle.

A seat's turn state is stamped as working, idle or stopped when it changes.

A seat is idle from the moment it is launched.

A seat with no turn record is stopped.

A seat is working while its context is being compacted.

Whether an idle seat is pending is read from its own page and nothing else.
