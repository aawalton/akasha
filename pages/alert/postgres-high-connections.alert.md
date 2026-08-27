---
id: b0bab4f2-9bae-5ecb-ae0a-4bb6595ffdd3
page-type-slug: alert
title: "Postgres high connections"
slug: postgres-high-connections
domain-parent-slug: page-type/alert
domain: infrastructure
summary: "Postgres {{ $labels.server }} at {{ $value | humanizePercentage }} of its own max_connections"
---

# Definition

- **Postgres high connections** — Postgres is holding close to as many connections as it allows.
