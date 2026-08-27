---
id: 2a1ac411-1eaa-5d8b-930e-3610aac8cc15
page-type-slug: old-graph-edge
title: "Graph edge import static"
slug: graph-edge-import-static
domain-parent-slug: domain/graph-edge-import
code-type: import-static
roots: true
attributes-slugs:
  - graph-edge-attribute-specifier
  - graph-edge-attribute-resolved
  - graph-edge-attribute-type-only
  - graph-edge-attribute-imported-symbols
---

# Definition

- **Graph edge import static** — the edge from a file to what it imports outright.

# Design

A file that augments a type it declares itself carries this edge to itself.
