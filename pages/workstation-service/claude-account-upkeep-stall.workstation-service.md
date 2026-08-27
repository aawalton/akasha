---
id: 3326939d-261e-5ce8-a5be-156010714450
page-type-slug: workstation-service
title: "Claude account upkeep stall"
slug: claude-account-upkeep-stall
domain-parent-slug: page-type/workstation-service
runs:
  - timeout 120 bun services/claude-account-upkeep-stall.ts --notify
enabled: true
schedule: "*:0/30"
catch-up: true
start-timeout-seconds: 300
---

# Definition

- **Claude account upkeep stall** — the service that rules on whether Claude account upkeep has stalled and tells Alan where.
