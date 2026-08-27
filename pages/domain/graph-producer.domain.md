---
id: fa051026-7f75-5bb7-9148-6f889a8006d3
page-type-slug: domain
title: "Graph producer"
slug: graph-producer
domain-parent-slug: domain/graph-system
settled: true
---

# Definition

- **Graph producer** — what reads the world and emits what it finds.

# Design

A producer emits nodes or edges, never both.

A producer records no derived fact.

A node type or an edge type can have more than one producer.

A producer names the producers it runs after, and sees what they emitted.

A node producer keys a node by the repository the node's subject stands in, not the one it read.

An edge producer joins nodes from any repository.

A producer extracts from source rather than running it.

What a producer reads from one file is kept. What it makes of the tree is not.

# Intent

A producer's name in code is its domain's slug.
