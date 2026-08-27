---
id: 100d2415-ff10-5a05-9bc1-6b28ca89a55a
page-type-slug: old-graph-edge-producer
title: "Graph edge producer dockerfile carries"
slug: graph-edge-producer-dockerfile-carries
domain-parent-slug: page-type/old-graph-edge-producer
code-name: dockerfile-carries
producer-path: tools/lib/graph/producers/dockerfile/dockerfile-carries.edge.producer.ts
edges-slugs:
  - graph-edge-dockerfile-carries
depends-on-slugs:
  - old-graph-node-producer/graph-node-producer-file
  - old-graph-node-producer/graph-node-producer-package
---

# Definition

- **Graph edge producer dockerfile carries** — the producer that links an image recipe to what its copy lines take in.

# Design

The producer folds a continued instruction back into one line before reading it.

A copy line's last operand is where it lands, and draws no edge.
