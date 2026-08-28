---
id: 92ab9789-4c4e-5522-b681-39bce9fdae8a
page-type-slug: cluster-service
title: "Loki"
slug: loki
domain-parent-slug: domain/log
kind: Deployment
namespace: loki
resource-name: loki
---

# Definition

- **Loki** — the store every log is shipped to and queried out of.

# Design

Loki keeps a log for seven days.

A workload's log reaches Loki from a collector on its node; a workstation program pushes its own.

Loki takes no authentication of its own, and only the tailnet limits who reaches it.
