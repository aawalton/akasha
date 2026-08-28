---
id: 7227ec4f-aeb2-539a-8327-a7a970ebf771
page-type-slug: page-property-definition
title: "Daily tracking total level"
defined-on-slug: page-type/daily-tracking
key: total-level
type: number
expression: 'case({faith-level} + {love-level} + {health-level} + {learn-level} + {fun-level} + {wealth-level} >= 24 -> 4, {faith-level} + {love-level} + {health-level} + {learn-level} + {fun-level} + {wealth-level} >= 18 -> 3, {faith-level} + {love-level} + {health-level} + {learn-level} + {fun-level} + {wealth-level} >= 12 -> 2, {faith-level} + {love-level} + {health-level} + {learn-level} + {fun-level} + {wealth-level} >= 6 -> 1, otherwise -> 0)'
slug: daily-tracking-total-level
domain-parent-slug: page-type/daily-tracking
---

# Definition

- **Daily tracking total level** — which of the four rungs the day's six values reached between them.
