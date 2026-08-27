---
id: 72067b5d-4841-5d06-b42e-db77ad30a272
page-type-slug: old-graph-edge
title: "Graph edge package deploy carries"
slug: graph-edge-package-deploy-carries
domain-parent-slug: domain/graph-edge-package
code-type: deploy-carries-package
---

# Definition

- **Graph edge package deploy carries** — the edge from a deployed thing to the package holding a file it reaches.

# Design

The edge is drawn from what a deploy reaches, never from what merely sits beside it.

A deploy reaches a package through the packages between it and that one, however far.

A deploy's reach is walked along the rooting edge types.

A file in no package draws no edge.

The innermost package holding the file is the one carried, so a nested workspace takes it from its parent.

One deploy reaching many files in one package draws one edge.

A deploy reaching only a package's manifest draws no edge.
