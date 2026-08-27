---
id: f7544d14-dffb-5bdd-aada-b1a4f057a945
page-type-slug: workstation-service
title: "Daily tracking points"
slug: daily-tracking-points
domain-parent-slug: domain/alan-harness-tracking
required-reading-slugs:
  - page-type/workstation-service
runs:
  - bun services/daily-tracking-points.ts
enabled: true
schedule: "hourly"
catch-up: true
---

# Definition

- **Daily tracking points** — the service that recomputes the points standing on Alan's tracked days.

# Design

Apple Health hands a day's samples over as much as three days after the day.

A rollup recomputes a day from that day's own window and overwrites it, so a day already settled reads the same figure again.

The points sources count git commits, session sidecars and cluster wedge messages, none of which arrive late.
