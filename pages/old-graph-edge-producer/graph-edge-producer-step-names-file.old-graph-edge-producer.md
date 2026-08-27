---
id: 8356546a-6357-5253-87d0-de3577f12bbb
page-type-slug: old-graph-edge-producer
title: "Graph edge producer step names file"
slug: graph-edge-producer-step-names-file
domain-parent-slug: page-type/old-graph-edge-producer
code-name: step-names-file
producer-path: tools/lib/graph/producers/pipeline/step-names-file.edge.producer.ts
edges-slugs:
  - graph-edge-pipeline-step-names-file
depends-on-slugs:
  - old-graph-node-producer/graph-node-producer-pipeline
  - old-graph-node-producer/graph-node-producer-file
---

# Definition

- **Graph edge producer step names file** — the producer that links each step to the files its commands name.

# Design

This producer reads the step nodes already standing and no file of its own.
