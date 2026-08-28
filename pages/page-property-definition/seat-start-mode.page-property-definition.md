---
id: 00ebf409-735e-5463-a902-b3b1bf20d515
page-type-slug: page-property-definition
title: "Seat start mode"
defined-on-slug: page-type/seat
key: start-mode
type: select(lower-kebab-case)
values:
  - interactive
  - headless
slug: seat-start-mode
domain-parent-slug: domain/seat-charter
required-reading-slugs:
  - domain/agent-mode
settled: true
---

# Definition

- **Seat start mode** — whether a terminal was attached to a seat when its first agent took it.

# Design

A seat's start mode does not change when its mode does.
