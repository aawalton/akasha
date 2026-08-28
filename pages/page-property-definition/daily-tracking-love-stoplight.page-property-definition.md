---
id: 01a04826-6b7c-7259-87eb-725512d671ee
page-type-slug: page-property-definition
title: "Daily tracking love stoplight"
defined-on-slug: page-type/daily-tracking
key: love-stoplight
type: text
expression: 'case({love-level} == 4 -> "🔵", {love-level} == 3 -> "🟢", {love-level} == 2 -> "🟡", {love-level} == 1 -> "🔴", otherwise -> "⚫")'
slug: daily-tracking-love-stoplight
domain-parent-slug: page-type/daily-tracking
---

# Definition

- **Daily tracking love stoplight** — the rung the day's love reached, as one colored light.
