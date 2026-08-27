---
id: 08999299-b11e-5e9e-8e3c-ff6a7bd556e1
page-type-slug: domain
title: "Change harness"
slug: change-harness
domain-parent-slug: domain/global
required-reading-slugs:
  - domain/resource-utilization
  - page-type/gate
  - domain/land
  - domain/run
persona-champion-slug: dalla
sequence-slugs:
  - domain/change-harness-definitions
  - page-type/patch
  - domain/checks-system
  - domain/change-harness-workstation
  - domain/change-harness-cluster
  - domain/change-harness-device
settled: true
---

# Definition

- **Change harness** — how a change goes from proposed to live.

# Design

A page type under this domain has its rows deleted rather than carried into files.

Anything a gate could refuse is not written as an instruction.

# Rules

## Green Or Gone

**Fix or delete a failing test before moving a change forward, whoever caused the failure.**

Knowing who broke it removes the duty, never the failure, so the red outlives everyone who saw it.

Loosening a test until it passes is not a fix.

Delete only a test that no longer earns its place.
