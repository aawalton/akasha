---
id: 6f28870d-fab2-5315-9815-2b44d7b337dd
page-type-slug: old-graph-edge-producer
title: "Graph edge producer k8s"
slug: graph-edge-producer-k8s
domain-parent-slug: page-type/old-graph-edge-producer
code-name: k8s-edge
producer-path: tools/lib/graph/producers/k8s/k8s.edge.producer.ts
edges-slugs:
  - graph-edge-k8s-pinned-to
  - graph-edge-k8s-uses-config
  - graph-edge-k8s-uses-secret
  - graph-edge-k8s-uses-service-account
  - graph-edge-k8s-uses-pvc
  - graph-edge-k8s-routes-to
  - graph-edge-k8s-selects
depends-on-slugs:
  - old-graph-node-producer/graph-node-producer-k8s
---

# Definition

- **Graph edge producer k8s** — the producer that links each resource in a manifest to what it uses.
