---
id: b0df6afb-ffd3-5a82-88f8-9b2fb5389470
page-type-slug: workstation-service
title: "Page query service"
slug: page-query-service
domain-parent-slug: page-type/page-query
required-reading-slugs:
  - page-type/workstation-service
runs:
  - bun services/page-query-service.ts
enabled: true
restart-delay-seconds: 1
needs-secrets: true
port: 8787
namespace: page-query-service
---

# Definition

- **Page query service** — the service that answers page queries and writes pages.

# Design

Nothing answers a page query while the service is down.

# Intent

Nothing off the workstation reads a page except through the service.
