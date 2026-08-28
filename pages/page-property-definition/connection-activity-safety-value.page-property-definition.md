---
id: 13bf8fbf-f436-5370-8163-1d652229a7fa
page-type-slug: page-property-definition
title: "Connection activity safety value"
defined-on-slug: page-type/connection-activity
key: safety-value
type: number
expression: 'case({safety} == "L3" -> 0.25, {safety} == "L4" -> 0.5, {safety} == "L5" -> 0.75, {safety} == "L6" -> 1, otherwise -> 0)'
slug: connection-activity-safety-value
domain-parent-slug: page-type/connection-activity
---

# Definition

- **Connection activity safety value** — safety as the multiplier the score uses.
