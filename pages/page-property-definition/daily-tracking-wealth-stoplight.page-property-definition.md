---
id: 01a04826-6b7c-71fd-a9d0-0241d2a74171
page-type-slug: page-property-definition
title: "Daily tracking wealth stoplight"
defined-on-slug: page-type/daily-tracking
key: wealth-stoplight
type: text
expression: 'case({wealth-level} == 4 -> "🔵", {wealth-level} == 3 -> "🟢", {wealth-level} == 2 -> "🟡", {wealth-level} == 1 -> "🔴", otherwise -> "⚫")'
slug: daily-tracking-wealth-stoplight
domain-parent-slug: page-type/daily-tracking
---

# Definition

- **Daily tracking wealth stoplight** — the rung the day's wealth reached, as one colored light.
