---
id: adf0109d-1fbd-5f60-b5c9-47924dbf4ae3
page-type-slug: alert
title: "Postgres base backup stale critical"
slug: postgres-base-backup-stale-critical
domain-parent-slug: page-type/alert
domain: infrastructure
summary: "Newest Postgres base backup is {{ $value | humanizeDuration }} old (>50h — two+ missed dailies)"
---

# Definition

- **Postgres base backup stale critical** — no Postgres base backup has completed for long enough that a restore would lose a great deal.
