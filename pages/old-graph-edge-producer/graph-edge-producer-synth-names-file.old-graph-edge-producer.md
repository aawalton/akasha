---
id: 345bb1bf-19fb-46aa-9aa6-1660279f9305
page-type-slug: old-graph-edge-producer
title: "Graph edge producer synth names file"
slug: graph-edge-producer-synth-names-file
domain-parent-slug: page-type/old-graph-edge-producer
code-name: synth-names-file
producer-path: tools/lib/graph/producers/k8s/synth-names-file.edge.producer.ts
edges-slugs:
  - graph-edge-k8s-synth-names-file
depends-on-slugs:
  - old-graph-node-producer/graph-node-producer-file
---

# Definition

- **Graph edge producer synth names file** — the producer that links a synth module to the files its container commands name.

# Design

The producer reads a synth module's whole import closure, so a command stated in a module beside it is reached.

The edge is drawn from the synth entry rather than from the module stating the command.
