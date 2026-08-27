---
id: 2aba1c18-7599-5477-a369-a30ef9b6a839
page-type-slug: old-graph-edge-producer
title: "Graph edge producer step runs bun entry"
slug: graph-edge-producer-step-runs-bun-entry
domain-parent-slug: page-type/old-graph-edge-producer
code-name: step-runs-bun-entry
producer-path: tools/lib/graph/producers/pipeline/step-runs-bun-entry.edge.producer.ts
edges-slugs:
  - graph-edge-pipeline-step-runs-script
depends-on-slugs:
  - old-graph-node-producer/graph-node-producer-pipeline
  - old-graph-node-producer/graph-node-producer-file
---

# Definition

- **Graph edge producer step runs bun entry** — the producer that links each step to the file a `bun` invocation in its commands starts.

# Design

This producer reads the step nodes already standing and no file of its own.

A step carrying a `script` is left to the producer that reads it, so one step draws this edge from one place.
