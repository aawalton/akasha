---
id: 01a02fd2-6b01-7000-b1d7-58e9c0a4f612
page-type-slug: old-graph-edge-producer
title: "Graph edge producer module file"
slug: graph-edge-producer-module-file
domain-parent-slug: page-type/old-graph-edge-producer
code-name: module-file-edge
producer-path: tools/lib/graph/producers/module-file/module-file.edge.producer.ts
edges-slugs:
  - graph-edge-module-opens-file
depends-on-slugs:
  - old-graph-node-producer/graph-node-producer-file
---

# Definition

- **Graph edge producer module file** — the producer that links each module to the files it opens beside itself.

# Design

The producer reads the code repository's modules and nothing else.
