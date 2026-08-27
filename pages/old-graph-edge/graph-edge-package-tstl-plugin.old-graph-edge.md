---
id: e20fac65-bd3e-54f2-8c30-887b38d85964
page-type-slug: old-graph-edge
title: "Graph edge package tstl plugin"
slug: graph-edge-package-tstl-plugin
domain-parent-slug: domain/graph-edge-package
code-type: tstl-plugin
roots: true
attributes-slugs:
  - graph-edge-attribute-specifier
  - graph-edge-attribute-resolved
  - graph-edge-attribute-index
---

# Definition

- **Graph edge package tstl plugin** — the edge from a package to where a Lua compiler plugin it uses comes from.

# Design

A package's plugins are the ones its tsconfig names and the ones it inherits through `extends`.

A specifier naming another package lands on that package, not on the file inside it.

A package carries one edge to each package its plugins come from, however many name it.

A relative specifier lands on the plugin's TypeScript source.

Where a relative specifier reaches no file, the edge lands on the package itself.

A specifier naming no package here carries no edge.
