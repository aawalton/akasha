---
id: 6c4a554a-ea50-52d4-ad68-99babad16b9f
page-type-slug: workstation-service
title: "Memory reaper"
slug: memory-reaper
domain-parent-slug: page-type/workstation-service
runs:
  - bun services/memory-reaper-daemon.ts
enabled: true
restart-delay-seconds: 5
---

# Definition

- **Memory reaper** — the service that kills an agent tree when the workstation runs short of memory.
