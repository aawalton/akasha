---
id: 7eec29b6-8394-5e6d-ba62-7e9ba21f9b31
page-type-slug: domain
title: "Daemon"
slug: daemon
domain-parent-slug: domain/service
required-reading-slugs:
  - domain/resource-utilization
---

# Definition

- **Daemon** — a loop a service runs on a tick.

# Design

A daemon runs one tick at a time.

# Rules

## Daemon Composition

**Compose every daemon through `runLongRunningWorker`, and emit `worker.loop_duration_ms` each tick.**

Composing is what times a tick, and an untimed tick leaves a wedged daemon reading as an idle one.

No `connect` on the pool means no heartbeat row.

A composed tick is timed; a wrapper doubles rows.
