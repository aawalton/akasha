---
id: 0018fb59-01f2-577e-bf2b-9169b047d74d
page-type-slug: workstation-service
title: "Alan email worker"
slug: alan-email-worker
domain-parent-slug: domain/alan-harness-services
required-reading-slugs:
  - domain/alan-email
  - page-type/workstation-service
runs:
  - bun services/email-watch.ts
enabled: true
restart-delay-seconds: 10
---

# Definition

- **Alan email worker** — the service that decides Alan's mail against his email rules.
