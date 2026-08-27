---
id: 8c234196-04f1-5e27-ae55-ee60f0bae3ef
page-type-slug: workstation-service
title: "Monarch sync"
slug: monarch-sync
domain-parent-slug: domain/monarch
required-reading-slugs:
  - page-type/workstation-service
runs:
  - bun services/monarch-sync.ts
enabled: true
schedule: "daily"
jitter-seconds: 1800
catch-up: true
start-timeout-seconds: 3600
---

# Definition

- **Monarch sync** — the service that copies the whole of Monarch and compares the copy against it.
