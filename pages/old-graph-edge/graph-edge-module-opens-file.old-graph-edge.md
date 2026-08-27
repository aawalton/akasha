---
id: 01a02fd2-6b00-7000-8e55-4c1a7f0b3d29
page-type-slug: old-graph-edge
title: "Graph edge module opens file"
slug: graph-edge-module-opens-file
domain-parent-slug: page-type/old-graph-edge
code-type: module-opens-file
attributes-slugs:
  - graph-edge-attribute-specifier
---

# Definition

- **Graph edge module opens file** — the edge from a module to a file it opens at a path resolved against its own location.

# Design

The path comes from the literal beside `import.meta`, never from running the module.

A path spelled from a variable draws no edge.

A path reaching outside the repository is left alone.
