---
id: 9613164f-050e-5d25-949c-ddc03fb983f2
page-type-slug: workstation-service
title: "Inbox tracking poll"
slug: inbox-tracking-poll
domain-parent-slug: page-type/workstation-service
runs:
  - bun services/inbox-tracking-poll.ts
enabled: true
schedule: "*:0/5"
catch-up: true
---

# Definition

- **Inbox tracking poll** — the service that refreshes the inbox counts the statusline shows.
