---
id: 49afd1e0-af1c-5dd7-b823-964f6dfe556d
page-type-slug: old-graph-edge
title: "Graph edge import reference path"
slug: graph-edge-import-reference-path
domain-parent-slug: domain/graph-edge-import
code-type: import-reference-path
attributes-slugs:
  - graph-edge-attribute-specifier
  - graph-edge-attribute-resolved
---

# Definition

- **Graph edge import reference path** — the edge from a file to the file its triple-slash reference names.

# Design

Only a reference standing in the file's leading comment draws an edge, as only one there is read as a directive.

A reference naming a package rather than a path draws no edge.
