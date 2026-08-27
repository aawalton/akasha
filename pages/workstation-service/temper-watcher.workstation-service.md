---
id: 679526a2-c338-53e6-bd34-a8683f391435
page-type-slug: workstation-service
title: "Temper watcher"
slug: temper-watcher
domain-parent-slug: domain/temper-data
runs:
  - bun services/temper-watcher.ts
enabled: true
restart: on-failure
restart-delay-seconds: 5
success-exit-status: 75
restart-force-exit-status: 75
start-limit-interval-seconds: 0
---

# Definition

- **Temper watcher** — the service that carries what Alan does in the game across to the web.

# Design

The worker runs from source rather than from a build, so a change to it reaches the workstation on a restart rather than on a deploy.

Exit 75 is how the worker asks to be started again, and it is counted as a clean stop so nothing reads a deliberate recycle as a fault.

Repeated starts are counted over no window at all, because a watcher that fails all night must still be trying in the morning.
