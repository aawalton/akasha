---
id: 48b5c0c9-5bd5-5513-8bff-690d8b44cea6
page-type-slug: workstation-service
title: "Send due reminders"
slug: send-due-reminders
domain-parent-slug: page-type/reminder
required-reading-slugs:
  - page-type/workstation-service
runs:
  - bun services/send-due-reminders.ts
enabled: true
schedule: "minutely"
jitter-seconds: 5
accuracy-seconds: 1
start-timeout-seconds: 300
---

# Definition

- **Send due reminders** — the service that sends each reminder whose schedule has come due.
