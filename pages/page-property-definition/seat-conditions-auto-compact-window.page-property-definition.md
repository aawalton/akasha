---
id: 01a015aa-74ac-7000-9d65-52526782d486
page-type-slug: page-property-definition
title: "Seat conditions auto compact window"
defined-on-slug: page-type/seat-conditions
key: auto-compact-window
type: number
default: 400000
slug: seat-conditions-auto-compact-window
domain-parent-slug: page-type/seat-conditions
---

# Definition

- **Seat conditions auto compact window** — the token count at which an agent is compacted.

# Design

Claude Code holds this between 100,000 and 1,000,000, whatever is stated.

A seat on a model with a smaller context window compacts at that window instead.
