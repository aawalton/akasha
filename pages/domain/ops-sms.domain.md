---
id: 751be9ea-d78f-55da-9742-47a56a29aa82
page-type-slug: domain
title: "Ops sms"
slug: ops-sms
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
---

# Definition

- **Ops sms** — the commands that put a text message out over Telnyx and read who a delivered one may be written as.

# Design

Nothing here fetches a message: the outbound command is handed a body, the inbound one a surface already delivered.
