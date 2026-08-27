---
id: 71be74f0-b9ad-5948-b408-5d846c5392a8
page-type-slug: alert
title: "Postgres base backup stale"
slug: postgres-base-backup-stale
domain-parent-slug: page-type/alert
domain: infrastructure
summary: "Newest Postgres base backup is {{ $value | humanizeDuration }} old (>26h)"
---

# Definition

- **Postgres base backup stale** — no Postgres base backup has completed for longer than is allowed.
