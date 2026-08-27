---
id: 85faa244-2714-552b-b0fd-b33b08a811de
page-type-slug: old-graph-edge-producer
title: "Graph edge producer bunfig file"
slug: graph-edge-producer-bunfig-file
domain-parent-slug: page-type/old-graph-edge-producer
code-name: bunfig-file-edge
producer-path: tools/lib/graph/producers/bunfig-file/bunfig-preloads-file.edge.producer.ts
edges-slugs:
  - graph-edge-bunfig-preloads-file
depends-on-slugs:
  - old-graph-node-producer/graph-node-producer-file
  - old-graph-node-producer/graph-node-producer-package
---

# Definition

- **Graph edge producer bunfig file** — the producer that links each `bunfig.toml` to the files it preloads.

# Design

The producer reads the code repository's `bunfig.toml` files and nothing else.

The preload array is read off the text rather than parsed as TOML.
