---
id: ac143fef-5898-583e-8acb-5cc7352034df
page-type-slug: workstation-service
title: "Great courses sync"
slug: great-courses-sync
domain-parent-slug: domain/collection-system
required-reading-slugs:
  - page-type/workstation-service
runs:
  - bun services/great-courses-sync.ts
enabled: true
schedule: "*-*-* 07:35:00"
jitter-seconds: 300
catch-up: true
start-timeout-seconds: 1800
needs-secrets: false
---

# Definition

- **Great courses sync** — the service that files a Great Courses course as a page where none stands for it.

# Design

A course sits on a shelf by that shelf's slug, `partOf` being a relation-slug.

A catalogue link naming no path is resolved against the catalogue's own address.

A read answering fewer pages than it counted is refused rather than returned.

The root's `lastSyncedAt` holds the sync off for thirty days after one lands.

Nothing is read or written except through the page query service, so no credential stands here.
