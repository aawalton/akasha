---
id: e23ecf8e-d902-5458-871a-46ac93af2917
page-type-slug: old-graph-edge
title: "Graph edge temper addon tsconfig"
slug: graph-edge-temper-addon-tsconfig
domain-parent-slug: page-type/old-graph-edge
code-type: addon-tsconfig
roots: true
attributes-slugs:
  - graph-edge-attribute-path
---

# Definition

- **Graph edge temper addon tsconfig** — the edge from an addon to the compiler configuration its build reads.

# Design

The configuration is the `tsconfig.json` standing in the addon's own directory.

An addon whose directory holds no such file draws no edge.
