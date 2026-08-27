---
id: 1209beb6-24d5-5dd9-adc1-d77dd15e1955
page-type-slug: workstation-service
title: "Rule population sweep"
slug: rule-population-sweep
domain-parent-slug: page-type/workstation-service
runs:
  - bun services/rule-population-sweep.ts
enabled: true
schedule: "*-*-* 09:53:00"
jitter-seconds: 60
catch-up: true
start-timeout-seconds: 1800
---

# Definition

- **Rule population sweep** — the service that reads what every enforcement rule weighed, and files the reading for `dalla`.

# Design

A rule's population is what it weighed, never what it found, and the two coincide at zero.

The reading is filed and never refused, an empty population wanting the rule removed in one case and repaired in the other.

A sweep that read no rules files nothing.

No graph cache is read, so the population is the checkout as it now stands.
