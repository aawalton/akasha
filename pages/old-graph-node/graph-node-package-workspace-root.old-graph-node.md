---
id: 6de8171e-b61e-555c-8ecc-427903a389f9
page-type-slug: old-graph-node
title: "Graph node package workspace root"
slug: graph-node-package-workspace-root
domain-parent-slug: domain/graph-node-package
code-type: workspace-root
deployed: true
attributes-slugs:
  - graph-node-attribute-path
---

# Definition

- **Graph node package workspace root** — the node for the repository every build starts from.

# Design

The root manifest also stands as a workspace package node, which is not a deploy root.

This node carries the tooling standing under no package, and nothing else the repository holds.
