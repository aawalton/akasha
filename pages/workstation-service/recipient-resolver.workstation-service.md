---
id: 368bbe13-4641-5d92-b113-aa9173ef2d21
page-type-slug: workstation-service
title: "Recipient resolver"
slug: recipient-resolver
domain-parent-slug: page-type/workstation-service
runs:
  - bun services/recipient-resolver-daemon.ts
enabled: true
restart-delay-seconds: 5
---

# Definition

- **Recipient resolver** — the service that resolves each message's recipient and puts an agent in the seat it names.

# Intent

A message with no recipient is resolved by what it states.

A recipient that matches no seat has one created.
