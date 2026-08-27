---
id: d1a12b8e-b5b7-5e31-b63c-f455d579b0f1
page-type-slug: workstation-service
title: "Tracking hourly confirm"
slug: tracking-hourly-confirm
domain-parent-slug: page-type/workstation-service
runs:
  - bun services/tracking-hourly-confirm.ts
enabled: true
schedule: "hourly"
start-timeout-seconds: 300
---

# Definition

- **Tracking hourly confirm** — the service that asks Alan whether he is still in the same tracked block.
