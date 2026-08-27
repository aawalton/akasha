---
id: 6736e5cd-0d5e-5cf2-9fb2-86a9f7ef9067
page-type-slug: domain
title: "Graph node file"
slug: graph-node-file
domain-parent-slug: page-type/old-graph-node
---

# Definition

- **Graph node file** — the node for one file in a repository.

# Design

A file has one node, except a tsconfig, a biome configuration and a tunnel route file, which have two.

A node stands for a file where its key names a tracked file, rather than where its type is named for one.

# Intent

One node type covers a format, however many extensions spell it.
