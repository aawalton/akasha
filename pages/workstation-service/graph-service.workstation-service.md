---
id: 531e6f69-4c6a-5315-a6cd-4f7fc52ae0ad
page-type-slug: workstation-service
title: "Graph service"
slug: graph-service
domain-parent-slug: domain/graph-system
required-reading-slugs:
  - page-type/workstation-service
runs:
  - bun services/graph-service.ts
enabled: true
restart-delay-seconds: 1
restarts-on:
  - tools/lib/graph/producers/**/*.ts
port: 8788
namespace: graph-service
settled: true
---

# Definition

- **Graph service** — what answers a question about the graph.

# Design

The graph service answers over HTTP, and the cluster reaches it at a Kubernetes service name pointing at the workstation.

Nothing answers a question about the graph while the service is down.

The first question at an identity waits for the whole build; every later one is answered from what is held.

A question can name two identities, and is answered from both.

A producer is found by scanning its directory rather than by being imported, so the service names that directory as what restarts it.
