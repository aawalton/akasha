---
page-type-slug: old-graph-node-producer
id: 2f0c6678-ea37-5612-918b-a9b7a464a6ad
title: "Graph node producer cluster check"
slug: graph-node-producer-cluster-check
domain-parent-slug: page-type/old-graph-node-producer
code-name: cluster-check
producer-path: tools/lib/graph/producers/cluster-check/cluster-check.node.producer.ts
reads-instructions-path:
  - pages/cluster-check/**
  - tools/lib/check-workflow/**
  - tools/lib/workflow-dsl/**
nodes-slugs:
  - graph-node-cluster-check
  - graph-node-pipeline-step
---

# Definition

- **Graph node producer cluster check** — the producer that reads the cluster check pages and emits each check and the step it becomes.
