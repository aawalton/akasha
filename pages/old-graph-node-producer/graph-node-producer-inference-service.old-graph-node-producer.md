---
id: 104ebd8c-b287-5a3e-b0c7-e4a4aad9eb04
page-type-slug: old-graph-node-producer
title: "Graph node producer inference service"
slug: graph-node-producer-inference-service
domain-parent-slug: page-type/old-graph-node-producer
code-name: inference-service
producer-path: tools/lib/graph/producers/inference-service/inference-service.node.producer.ts
reads-instructions-path: tools/lib/inference/**
nodes-slugs:
  - graph-node-inference-service
---

# Definition

- **Graph node producer inference service** — the producer that emits a service for each one the registry declares.

# Design

The set that deploys is read from the source declaring it, never from a copy of that list kept here.

The list is read through the spread that joins its two halves, so a service declared in either half is found.

Nothing is executed and nothing is read from the filesystem.
