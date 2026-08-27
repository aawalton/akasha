---
id: bcab58fc-dd83-5f1e-82a5-055c995b17cf
page-type-slug: old-graph-edge
title: "Graph edge package image built from"
slug: graph-edge-package-image-built-from
domain-parent-slug: domain/graph-edge-package
code-type: image-built-from
roots: true
---

# Definition

- **Graph edge package image built from** — the edge from a package the generator builds an image for to the file extending its recipe.

# Design

The file stands under the package's own `deploy/` directory, named by the registry or by the default where it names none.

A tool image's extensions file is reached by the recipe's own input edge instead.

A registry entry whose extensions file the commit does not hold draws no edge.
