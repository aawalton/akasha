---
id: 7fffdac3-ef23-5c08-8b4a-49421e1c3d57
page-type-slug: old-graph-edge-producer
title: "Graph edge producer synth runs entry"
slug: graph-edge-producer-synth-runs-entry
domain-parent-slug: page-type/old-graph-edge-producer
code-name: synth-runs-entry
producer-path: tools/lib/graph/producers/k8s/synth-runs-entry.edge.producer.ts
edges-slugs:
  - graph-edge-k8s-synth-runs-entry
depends-on-slugs:
  - old-graph-node-producer/graph-node-producer-file
---

# Definition

- **Graph edge producer synth runs entry** — the producer that links a synth module to the file its container command starts.

# Design

The producer reads a synth module's whole import closure, so a command stated in a module beside it is reached.

The edge is drawn from the synth entry rather than from the module stating the command.
