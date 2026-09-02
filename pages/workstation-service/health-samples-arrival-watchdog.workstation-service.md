---
id: 01a06096-02f3-7c01-bc6c-7a22c017d022
page-type-slug: workstation-service
title: "Health samples arrival watchdog"
slug: health-samples-arrival-watchdog
domain-parent-slug: domain/alan-harness-services
required-reading-slugs:
  - page-type/workstation-service
runs:
  - timeout 120 bun services/health-samples-arrival-watchdog.ts
enabled: true
schedule: "*:17"
catch-up: true
start-timeout-seconds: 300
---

# Definition

- **Health samples arrival watchdog** — the service that rules on whether Alan's health readings are still arriving and tells him when they stopped.

# Design

Arrival is read from when a reading last came, never from which days carry data: a day holding no reading and a day Alan did not move read alike.

The bound is seventy-two hours, measured rather than chosen — the longest healthy gap was forty-two.

`--notify` is off, since Alan asked that nothing reach his phone, so the unit going red is the whole signal.

It cannot say which of the phone, the POST and the writer stopped; all three read alike from the rows.

# Intent

The service runs.
