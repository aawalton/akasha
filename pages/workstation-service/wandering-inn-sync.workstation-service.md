---
id: 4ce5ea9d-83cf-5966-9057-b1f284344e48
page-type-slug: workstation-service
title: "Wandering Inn sync"
slug: wandering-inn-sync
domain-parent-slug: domain/litrpg-books
required-reading-slugs:
  - page-type/workstation-service
runs:
  - flock -n /var/tmp/wandering-inn-sync.lock bun services/wandering-inn-sync.ts
enabled: true
schedule: "*-*-* 07:40:00"
jitter-seconds: 300
catch-up: true
start-timeout-seconds: 10800
needs-secrets: false
---

# Definition

- **Wandering Inn sync** — the service that files each new Wandering Inn chapter as a page.

# Design

The table of contents is read in a browser, because the site serves the chapter list to one.

A chapter behind Patreon is left rather than filed, and reads as new again on the next run.

A run that reads no filed chapter at all refuses, since an empty answer would file the whole story a second time.

A run's own record is written where the page query service answers and left where it does not, so a service under load costs the record rather than the chapters.
