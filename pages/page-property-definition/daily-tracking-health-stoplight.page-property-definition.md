---
id: 01a04826-6b7c-70c7-8050-c5b5b42ba692
page-type-slug: page-property-definition
title: "Daily tracking health stoplight"
defined-on-slug: page-type/daily-tracking
key: health-stoplight
type: text
expression: 'case({health-level} == 4 -> "🔵", {health-level} == 3 -> "🟢", {health-level} == 2 -> "🟡", {health-level} == 1 -> "🔴", otherwise -> "⚫")'
slug: daily-tracking-health-stoplight
domain-parent-slug: page-type/daily-tracking
---

# Definition

- **Daily tracking health stoplight** — the rung the day's health reached, as one colored light.
