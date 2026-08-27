---
id: 5c312298-5de6-515a-9c6e-96841889a8f7
page-type-slug: old-graph-edge-producer
title: "Graph edge producer k8s synth"
slug: graph-edge-producer-k8s-synth
domain-parent-slug: page-type/old-graph-edge-producer
code-name: k8s-synth-edges
producer-path: tools/lib/graph/producers/k8s/k8s-synth.edge.producer.ts
edges-slugs:
  - graph-edge-k8s-synth-emits
  - graph-edge-k8s-rbac-applies
  - graph-edge-sops-secret
  - graph-edge-k8s-applyrbac-uses
  - graph-edge-k8s-synth-generated-by
depends-on-slugs:
  - old-graph-node-producer/graph-node-producer-k8s-synth
  - old-graph-node-producer/graph-node-producer-pipeline
---

# Definition

- **Graph edge producer k8s synth** — the producer that links a workflow to the resources it sets up, and each resource to its module.
