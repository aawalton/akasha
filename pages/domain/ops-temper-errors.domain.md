---
id: 6e22296c-da45-5221-a099-3423913b663f
page-type-slug: domain
title: "Ops temper errors"
slug: ops-temper-errors
domain-parent-slug: domain/ops-temper
required-reading-slugs:
  - domain/ops-namespace
  - domain/temper
---

# Definition

- **Ops temper errors** — the one command over the Lua errors the game captured, telling the still-firing from the residue.

# Design

The capture file is cumulative, so the listing is the cheap half. The work is holding back an error whose owning source changed after it last fired, and one that has stopped firing.

Where an error is attributed to an addon, the build in memory when it fired is compared against the build last deployed, so a client running old bytes is not read as a fresh fault.
