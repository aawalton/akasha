---
id: a4b9dfe0-2213-5e24-81c9-369568780f29
page-type-slug: old-graph-edge-producer
title: "Graph edge producer synth recipe input"
slug: graph-edge-producer-synth-recipe-input
domain-parent-slug: page-type/old-graph-edge-producer
code-name: synth-recipe-input
producer-path: tools/lib/graph/producers/k8s/synth-recipe-input.edge.producer.ts
edges-slugs:
  - graph-edge-recipe-input-synth
depends-on-slugs:
  - old-graph-node-producer/graph-node-producer-file
---

# Definition

- **Graph edge producer synth recipe input** — the producer that links a synth module to the files standing beside it.

# Design

The producer names a file by where it stands, so nothing turns on which expression in the module opens it.
