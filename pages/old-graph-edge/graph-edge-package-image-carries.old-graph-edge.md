---
id: 2fbdb2c3-8b93-5e73-abc9-2f94446c9723
page-type-slug: old-graph-edge
title: "Graph edge package image carries"
slug: graph-edge-package-image-carries
domain-parent-slug: domain/graph-edge-package
code-type: image-carries
roots: true
---

# Definition

- **Graph edge package image carries** — the edge from a package the generator builds an image for to what that build copies in.

# Design

The edge is read from the generator's registry and the rule it applies, never from the Dockerfile it writes.

A copied directory draws the edge to the package standing at that path, and to none of the files inside it.

A package's own directory draws no edge.

A copy out of an earlier build stage draws no edge.

A copy naming a path the commit does not hold draws no edge.

Every image carries every workspace manifest.

# Intent

The packages a build reaches by import are carried here too.
