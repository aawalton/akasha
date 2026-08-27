---
id: 881f93c9-6d81-5300-8ea0-7cb112a02a26
page-type-slug: alert
title: "Backup stale"
slug: backup-stale
domain-parent-slug: page-type/alert
domain: infrastructure
summary: "Backup CronJob {{ $labels.cronjob }} has not succeeded within 1.5x its own schedule"
---

# Definition

- **Backup stale** — no backup has completed for longer than is allowed.
