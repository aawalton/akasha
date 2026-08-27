---
id: 39ca7011-f47e-5b75-bee6-6d1ec1f2c28c
page-type-slug: old-graph-node
title: "Graph node package rust"
slug: graph-node-package-rust
domain-parent-slug: domain/graph-node-package
code-type: rust-package
attributes-slugs:
  - graph-node-attribute-name
  - graph-node-attribute-path
---

# Definition

- **Graph node package rust** — the node for one package a `Cargo.toml` declares.

# Design

A crate is a deploy root, where a workspace package is not.

A crate stands here as itself rather than as a `package.json` added to suit the graph.
