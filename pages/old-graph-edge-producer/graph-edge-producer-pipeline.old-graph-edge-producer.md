---
id: 083a7f6f-1a6a-516d-be6f-edc6aea3e80c
page-type-slug: old-graph-edge-producer
title: "Graph edge producer pipeline"
slug: graph-edge-producer-pipeline
domain-parent-slug: page-type/old-graph-edge-producer
code-name: pipeline-edge
producer-path: tools/lib/graph/producers/pipeline/pipeline.edge.producer.ts
edges-slugs:
  - graph-edge-pipeline-workflow-depends-on
  - graph-edge-pipeline-workflow-dispatches
  - graph-edge-pipeline-step-depends-on
  - graph-edge-pipeline-step-of-workflow
  - graph-edge-pipeline-workflow-runs-step
depends-on-slugs:
  - old-graph-node-producer/graph-node-producer-pipeline
---

# Definition

- **Graph edge producer pipeline** — the producer that links a pipeline's parts to each other, and each workflow to what it deploys.
