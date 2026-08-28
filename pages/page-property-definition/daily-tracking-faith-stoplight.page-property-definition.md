---
id: 01a04826-6b7c-7ed6-aa99-9313ce783b57
page-type-slug: page-property-definition
title: "Daily tracking faith stoplight"
defined-on-slug: page-type/daily-tracking
key: faith-stoplight
type: text
expression: 'case({faith-level} == 4 -> "🔵", {faith-level} == 3 -> "🟢", {faith-level} == 2 -> "🟡", {faith-level} == 1 -> "🔴", otherwise -> "⚫")'
slug: daily-tracking-faith-stoplight
domain-parent-slug: page-type/daily-tracking
---

# Definition

- **Daily tracking faith stoplight** — the rung the day's faith reached, as one colored light.
