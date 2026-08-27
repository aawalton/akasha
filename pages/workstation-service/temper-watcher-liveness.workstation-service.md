---
id: 2fb8d7df-88e0-545c-b0e1-40c0ab33372b
page-type-slug: workstation-service
title: "Temper watcher liveness"
slug: temper-watcher-liveness
domain-parent-slug: page-type/workstation-service
runs:
  - bun services/temper-watcher-liveness.ts
enabled: true
boot-delay-seconds: 90
interval-seconds: 60
catch-up: true
---

# Definition

- **Temper watcher liveness** — the service that says when the temper watcher has stopped carrying anything across.

# Design

It watches from outside the watcher, because nothing inside a dead daemon reports that it died.

A crash loop and a stall are separate signals: a sub-second restart resumes the heartbeat before any staleness threshold trips, so the fatal line is read as well as the heartbeat.

Each signal carries its own last-paged stamp, so a watcher that stays down is stated once an hour rather than once a tick.
