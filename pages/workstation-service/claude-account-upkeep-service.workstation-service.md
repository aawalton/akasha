---
id: cf757cf0-c432-5802-ab66-a8b1f9fcdcc1
page-type-slug: workstation-service
title: "Claude account upkeep service"
slug: claude-account-upkeep-service
domain-parent-slug: page-type/workstation-service
runs:
  - bun services/claude-account-upkeep.ts
enabled: true
restart-delay-seconds: 10
---

# Definition

- **Claude account upkeep service** — the service that renews each Claude account's token and reads its usage every hour.
