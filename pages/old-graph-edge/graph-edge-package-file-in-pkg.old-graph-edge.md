---
id: 4b79f36e-8cf0-59a3-8a84-9a4200323d81
page-type-slug: old-graph-edge
title: "Graph edge package file in pkg"
slug: graph-edge-package-file-in-pkg
domain-parent-slug: domain/graph-edge-package
code-type: file-in-pkg
roots: false
---

# Definition

- **Graph edge package file in pkg** — the edge from a file to the package that holds it.

# Design

This edge and `pkg-contains-file` run opposite ways, and neither roots: a package holds a file, which says nothing about whether a deploy carries it.
