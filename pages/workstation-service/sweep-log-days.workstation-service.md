---
id: 01a03b2f-4e21-7000-b7c5-1d9a4e3f8a60
page-type-slug: workstation-service
title: "Sweep log days"
slug: sweep-log-days
domain-parent-slug: page-type/workstation-service
runs:
  - bun services/sweep-log-days.ts --remove
enabled: true
schedule: "daily"
jitter-seconds: 600
start-timeout-seconds: 900
---

# Definition

- **Sweep log days** — the service that removes every log day past the window a log is kept for.
