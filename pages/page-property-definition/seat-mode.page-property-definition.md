---
id: 01a01519-ea4a-7000-8438-eb5614909ffe
page-type-slug: page-property-definition
title: "Seat mode"
defined-on-slug: page-type/seat
key: mode
type: select(lower-kebab-case)
values:
  - interactive
  - headless
computed: true
slug: seat-mode
domain-parent-slug: domain/seat-charter
required-reading-slugs:
  - domain/agent-mode
settled: true
---

# Definition

- **Seat mode** — whether a terminal is attached to a seat while an agent works there.

# Intent

A seat's mode is whether it has a code editor terminal.
