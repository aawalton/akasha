---
id: 28c31818-488c-5352-9727-7b65599798bd
page-type-slug: workstation-service
title: "Orphaned resources sweep"
slug: orphaned-resources-sweep
domain-parent-slug: page-type/workstation-service
runs:
  - bun services/orphaned-resources-sweep.ts
enabled: true
schedule: "*-*-* 08:41:00"
jitter-seconds: 60
catch-up: true
start-timeout-seconds: 600
---

# Definition

- **Orphaned resources sweep** — the service that says which live cluster resources no source manifest accounts for.

# Design

Only the app namespaces are swept, and in them only Deployments, Services and StatefulSets.

A resource nothing labels as a deploy's is passed over, because nothing here claims to be its source.

A clean sweep says nothing, so every message this sends is drift.

The manifests it compares against are read from the code checkout beside this one as it now stands.
