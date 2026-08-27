---
id: e288c9dd-74c4-5562-91b5-d0a57a0bb7ef
page-type-slug: alert
title: "Cron job stale"
slug: cron-job-stale
domain-parent-slug: page-type/alert
domain: infrastructure
summary: "CronJob {{ $labels.namespace }}/{{ $labels.cronjob }} has not succeeded within 2x its schedule"
---

# Definition

- **Cron job stale** — a cron job has gone longer without completing than its schedule allows.
