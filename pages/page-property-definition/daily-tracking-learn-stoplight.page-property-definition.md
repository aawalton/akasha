---
id: 01a04826-6b7c-7df6-9c55-08fb7bb8341a
page-type-slug: page-property-definition
title: "Daily tracking learn stoplight"
defined-on-slug: page-type/daily-tracking
key: learn-stoplight
type: text
expression: 'case({learn-level} == 4 -> "🔵", {learn-level} == 3 -> "🟢", {learn-level} == 2 -> "🟡", {learn-level} == 1 -> "🔴", otherwise -> "⚫")'
slug: daily-tracking-learn-stoplight
domain-parent-slug: page-type/daily-tracking
---

# Definition

- **Daily tracking learn stoplight** — the rung the day's learn reached, as one colored light.
