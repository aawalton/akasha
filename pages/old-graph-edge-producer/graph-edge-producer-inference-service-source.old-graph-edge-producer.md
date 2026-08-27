---
id: 44d484f2-30f1-55b6-8764-5690958a81d8
page-type-slug: old-graph-edge-producer
title: "Graph edge producer inference service source"
slug: graph-edge-producer-inference-service-source
domain-parent-slug: page-type/old-graph-edge-producer
code-name: inference-service-source
producer-path: tools/lib/graph/producers/inference-service/inference-service-source.edge.producer.ts
edges-slugs:
  - graph-edge-inference-service-source
depends-on-slugs:
  - old-graph-node-producer/graph-node-producer-inference-service
  - old-graph-node-producer/graph-node-producer-file
---

# Definition

- **Graph edge producer inference service source** — the producer that links each service to the files under the directory it copies.

# Design

A file is under the directory when its key starts with that directory, which is how the copy chooses too.
