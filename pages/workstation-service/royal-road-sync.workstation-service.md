---
id: 63ddb572-945c-5ee5-92c8-f83b1c1e6e9a
page-type-slug: workstation-service
title: "Royal road sync"
slug: royal-road-sync
domain-parent-slug: domain/royal-road
required-reading-slugs:
  - page-type/workstation-service
runs:
  - flock -n /var/tmp/royal-road-sync.lock bun services/royal-road-sync.ts --commit
enabled: true
schedule: "hourly"
jitter-seconds: 300
catch-up: true
start-timeout-seconds: 21600
needs-secrets: false
---

# Definition

- **Royal road sync** — the service that syncs Royal Road chapters.
