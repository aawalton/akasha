---
id: fd04ec31-33fe-5fa3-8fa0-f73b04ae79f0
page-type-slug: domain
title: "Loki"
slug: loki
domain-parent-slug: domain/log
---

# Definition

- **Loki** — the store every log is shipped to and queried out of.

# Design

Loki keeps a log for seven days.

A workload's log reaches Loki from a collector on its node; a workstation program pushes its own.

Loki takes no authentication of its own, and only the tailnet limits who reaches it.
