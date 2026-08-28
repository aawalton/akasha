---
id: 3b82b9f9-f20c-5ac7-b63f-25f132ec6ce0
page-type-slug: page-property-definition
title: "Connection activity modality value"
defined-on-slug: page-type/connection-activity
key: modality-value
type: number
expression: 'case(contains({modality}, "presence") -> 0.5, otherwise -> 0) + case(contains({modality}, "digital-presence") -> 0.15, otherwise -> 0) + case(contains({modality}, "audio") -> 0.25, otherwise -> 0) + case(contains({modality}, "text") -> 0.15, otherwise -> 0) + case(contains({modality}, "image") -> 0.1, otherwise -> 0)'
slug: connection-activity-modality-value
domain-parent-slug: page-type/connection-activity
---

# Definition

- **Connection activity modality value** — the senses it reaches him through, as the multiplier the score uses.
