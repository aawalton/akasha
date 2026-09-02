---
id: 673e6166-15e9-591f-a2c0-62e76866bd98
page-type-slug: workstation-service
title: "Surplus fall notifier"
slug: surplus-fall-notifier
domain-parent-slug: domain/alan-harness-services
required-reading-slugs:
  - page-type/workstation-service
runs:
  - bun services/surplus-fall-notifier.ts
enabled: true
restart-delay-seconds: 30
restart-prevent-exit-status: 1
---

# Definition

- **Surplus fall notifier** — the service that says when the day has spent Alan's night down a rung.

# Design

The day opens on what Alan slept, placed on the readout's own scale.

Every rung between where the day opened and where it stands is claimed, so a rung passed through is never said later.

What this writes is a notification, and reaching a device is the push notifier's.

The notification is its own record of what was said, so a rung is never announced twice off a second write that could fail on its own.

Three thrown ticks in a row end the process on exit 1, which systemd does not restart, so a notifier that can no longer read goes red instead of running green and saying nothing.

# Intent

The service runs.
