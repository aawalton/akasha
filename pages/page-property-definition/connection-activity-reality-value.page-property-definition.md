---
id: a5bf0fd8-da0b-56a4-9cd5-4af7651d69ed
page-type-slug: page-property-definition
title: "Connection activity reality value"
defined-on-slug: page-type/connection-activity
key: reality-value
type: number
expression: (prop(reality) == 'authentic') * 1.0 + (prop(reality) == 'professional') * 0.5 + (prop(reality) == 'celebrity') * 0.25
slug: connection-activity-reality-value
domain-parent-slug: page-type/connection-activity
---

# Definition

- **Connection activity reality value** — reality as the multiplier the score uses.
