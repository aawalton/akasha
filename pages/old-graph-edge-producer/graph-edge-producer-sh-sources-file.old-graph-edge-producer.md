---
id: c9915a8e-5743-5feb-8685-6e83cd41536e
page-type-slug: old-graph-edge-producer
title: "Graph edge producer sh sources file"
slug: graph-edge-producer-sh-sources-file
domain-parent-slug: page-type/old-graph-edge-producer
code-name: sh-sources-file
producer-path: tools/lib/graph/producers/file/sh-file/sh-sources-file.edge.producer.ts
edges-slugs:
  - graph-edge-sh-file-sources
depends-on-slugs:
  - old-graph-node-producer/graph-node-producer-file
---

# Definition

- **Graph edge producer sh sources file** — the producer that links a script to the files it sources.

# Design

The producer reads the shell checker's directive, so a script whose author wrote none contributes nothing.
