---
id: f70a6372-43d9-42ea-b4af-0bad35a43bec
page-type-slug: old-graph-edge
title: "Graph edge import stylesheet"
slug: graph-edge-import-stylesheet
domain-parent-slug: domain/graph-edge-import
code-type: import-stylesheet
attributes-slugs:
  - graph-edge-attribute-specifier
  - graph-edge-attribute-resolved
---

# Definition

- **Graph edge import stylesheet** — the edge from a module to a stylesheet it imports for its effect.

# Design

The edge is drawn from a specifier relative to the importing module, and from no other shape of specifier.

A specifier resolving to no stylesheet in this repository draws no edge.
