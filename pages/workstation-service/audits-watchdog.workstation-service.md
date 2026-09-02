---
id: 01a06118-4b3f-7a20-9c41-6d0e5b1a7c88
page-type-slug: workstation-service
title: "Audits watchdog"
slug: audits-watchdog
domain-parent-slug: domain/alan-harness-services
required-reading-slugs:
  - page-type/workstation-service
runs:
  - timeout 1200 bun services/audits-watchdog.ts
enabled: true
schedule: "*:41"
catch-up: true
start-timeout-seconds: 1260
---

# Definition

- **Audits watchdog** — the service that runs the audits standing under `tools/audits/` and goes red when one of them refuses.

# Design

Nothing else runs these audits; the live net reaches forty of fifty-seven thousand documents.

This is no landing gate, and nothing here reaches a phone: the unit going red is the whole signal.

Each audit runs in its own process, two commands four of them load exiting on import.

An audit that measured nothing, died, or went unreached refuses rather than passing.

The bounds are measured off a first whole run of ninety-nine seconds, and `--help` says why.

# Intent

The service runs.
