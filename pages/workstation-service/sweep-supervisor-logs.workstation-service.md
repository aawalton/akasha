---
id: 01a033a4-98c1-7167-9e3e-387829512ba6
page-type-slug: workstation-service
title: "Sweep supervisor logs"
slug: sweep-supervisor-logs
domain-parent-slug: page-type/workstation-service
runs:
  - bun services/sweep-supervisor-logs.ts --remove
enabled: true
schedule: "daily"
jitter-seconds: 600
start-timeout-seconds: 900
---

# Definition

- **Sweep supervisor logs** — the service that removes the log directory of every supervisor whose seat is gone.
