---
id: 92b2713c-4abe-579a-9097-dcfa8de7b698
page-type-slug: old-graph-edge
title: "Graph edge package carries tooling"
slug: graph-edge-package-carries-tooling
domain-parent-slug: domain/graph-edge-package
code-type: pkg-carries-tooling
---

# Definition

- **Graph edge package carries tooling** — the edge from a package to a file configuring its tooling rather than carrying its content.

# Design

The node types this carries are the graph's own classification of every tracked file, rather than a list of names standing here.

A tooling file's owner is the package whose path is the longest prefix of it, which is the owner `pkg-contains-file` reads.

A tooling file under no package draws no edge.

A tooling file in an unrooted package stays unrooted.

# Rules

## Leaf Only

**Add a node type here only where no rooting edge leaves it, checked against `rootingEdgeTypes()`.**

A type that roots onward carries this edge into the package source it exists to leave alone.

Node type is the looking, not a filename list.

Make a type leaf before adding it, never after.
