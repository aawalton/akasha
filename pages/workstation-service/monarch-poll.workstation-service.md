---
id: 41213dd1-d5fc-507c-8ce0-9e358a2e5654
page-type-slug: workstation-service
title: "Monarch poll"
slug: monarch-poll
domain-parent-slug: domain/monarch
required-reading-slugs:
  - page-type/workstation-service
runs:
  - bun services/monarch-poll.ts
enabled: true
schedule: "minutely"
jitter-seconds: 10
accuracy-seconds: 1
start-timeout-seconds: 300
---

# Definition

- **Monarch poll** — the service that lands the Monarch rows whose update time has moved.
