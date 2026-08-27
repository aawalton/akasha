---
id: 36395ba1-14be-5d0c-9f34-62833ed9413e
page-type-slug: workstation-service
title: "Sweep seat pages"
slug: sweep-seat-pages
domain-parent-slug: page-type/workstation-service
runs:
  - bun services/sweep-seat-pages.ts --remove
enabled: true
schedule: "hourly"
jitter-seconds: 300
start-timeout-seconds: 120
---

# Definition

- **Sweep seat pages** — the service that removes the page of every seat no agent is present in.
