---
id: 4e173ec2-40f8-5fa5-9c6b-d6169f03b8fc
page-type-slug: old-graph-edge-producer
title: "Graph edge producer dockerfile compiles entry"
slug: graph-edge-producer-dockerfile-compiles-entry
domain-parent-slug: page-type/old-graph-edge-producer
code-name: dockerfile-compiles-entry
producer-path: tools/lib/graph/producers/file/dockerfile-file/dockerfile-compiles-entry.edge.producer.ts
edges-slugs:
  - graph-edge-dockerfile-compiles-entry
depends-on-slugs:
  - old-graph-node-producer/graph-node-producer-file
---

# Definition

- **Graph edge producer dockerfile compiles entry** — the producer that links a Dockerfile to the TypeScript entries its build commands compile.

# Design

The producer folds a continued instruction back into one line before reading it.
