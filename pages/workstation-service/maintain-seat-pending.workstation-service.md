---
id: 01a026aa-c443-7000-8636-7a36d8bbf564
page-type-slug: workstation-service
title: "Maintain seat pending"
slug: maintain-seat-pending
domain-parent-slug: page-type/workstation-service
required-reading-slugs:
  - page-type/workstation-service
runs:
  - bun services/maintain-seat-pending.ts
enabled: true
restart-delay-seconds: 10
---

# Definition

- **Maintain seat pending** — the service that keeps each seat's pending components true between one turn end and the next.
