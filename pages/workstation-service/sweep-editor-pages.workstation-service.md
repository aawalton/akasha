---
id: 41631b88-4368-57c4-b01b-c22088049ea0
page-type-slug: workstation-service
title: "Sweep editor pages"
slug: sweep-editor-pages
domain-parent-slug: page-type/workstation-service
runs:
  - bun services/sweep-editor-pages.ts --remove
enabled: true
schedule: "hourly"
jitter-seconds: 300
start-timeout-seconds: 120
---

# Definition

- **Sweep editor pages** — the service that removes every editor page whose window or terminal is gone.
