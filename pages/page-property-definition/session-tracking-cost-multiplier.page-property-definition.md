---
id: a73770b7-d0fd-54b9-9d87-fa252b950084
page-type-slug: page-property-definition
title: "Session tracking cost multiplier"
defined-on-slug: page-type/session-tracking
key: cost-multiplier
type: number
expression: "if(prop(safety-level) == null, 0, if(prop(difficulty-level) == null, 0, if((prop(safety-level) - prop(difficulty-level)) >= 1, 0, if((prop(safety-level) - prop(difficulty-level)) >= 0, 1 - (prop(safety-level) - prop(difficulty-level)), if((prop(safety-level) - prop(difficulty-level)) == -0.5, 1.5, if((prop(safety-level) - prop(difficulty-level)) == -1, 2, if((prop(safety-level) - prop(difficulty-level)) == -1.5, 3, if((prop(safety-level) - prop(difficulty-level)) == -2, 4, if((prop(safety-level) - prop(difficulty-level)) == -2.5, 6, if((prop(safety-level) - prop(difficulty-level)) == -3, 8, if((prop(safety-level) - prop(difficulty-level)) == -3.5, 12, if((prop(safety-level) - prop(difficulty-level)) == -4, 16, if((prop(safety-level) - prop(difficulty-level)) == -4.5, 24, if((prop(safety-level) - prop(difficulty-level)) <= -5, 32, 0))))))))))))))"
slug: session-tracking-cost-multiplier
domain-parent-slug: page-type/session-tracking
---

# Definition

- **Session tracking cost multiplier** — how many hours of stress capacity an hour of it takes.

# Design

A stretch rated a full level safer than it is difficult costs nothing.

An unrated safety or difficulty costs nothing rather than standing as zero.
