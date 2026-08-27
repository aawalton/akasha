---
id: bf3b45d6-baf5-562a-8183-07c08bb2e3ea
page-type-slug: workstation-service
title: "CI container reaper"
slug: ci-container-reaper
domain-parent-slug: page-type/pipeline
required-reading-slugs:
  - page-type/workstation-service
runs:
  - bun services/ci-container-reaper.ts
enabled: true
restart-delay-seconds: 10
---

# Definition

- **CI container reaper** — the service that clears finished step containers off the cluster.

# Design

The reaper runs on the workstation and the step containers it reaps run on the cluster.

A step's verdict is not written here.

Every write is guarded on the status it was decided from, read again just before it, which narrows the window rather than closing it.

Prometheus is reached through the k8s API server's service proxy.

# Intent

Everything the reaper reads about a step or a pipeline stands in that page's file.

Nothing the reaper writes is committed.
