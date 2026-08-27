---
id: c30ff978-61c1-547c-9513-773833635105
page-type-slug: old-graph-edge-producer
title: "Graph edge producer db declared in"
slug: graph-edge-producer-db-declared-in
domain-parent-slug: page-type/old-graph-edge-producer
code-name: db-declared-in-edge
producer-path: tools/lib/graph/producers/db/db-declared-in.edge.producer.ts
edges-slugs:
  - graph-edge-db-function-declared-in
  - graph-edge-db-table-declared-in
  - graph-edge-db-trigger-declared-in
depends-on-slugs:
  - old-graph-node-producer/graph-node-producer-db
---

# Definition

- **Graph edge producer db declared in** — the producer that links each database object to the file its definition was read from.

# Design

The file is the one the node's own source path names, so the edge reads nothing the node producer did not.
