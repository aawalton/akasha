---
id: 01a04826-6b7c-7819-9138-2867adb92145
page-type-slug: page-property-definition
title: "Daily tracking fun stoplight"
defined-on-slug: page-type/daily-tracking
key: fun-stoplight
type: text
expression: 'case({fun-level} == 4 -> "🔵", {fun-level} == 3 -> "🟢", {fun-level} == 2 -> "🟡", {fun-level} == 1 -> "🔴", otherwise -> "⚫")'
slug: daily-tracking-fun-stoplight
domain-parent-slug: page-type/daily-tracking
---

# Definition

- **Daily tracking fun stoplight** — the rung the day's fun reached, as one colored light.
