---
id: 1da54c3e-4974-54eb-8a1c-62b3d725d497
page-type-slug: old-graph-edge
title: "Graph edge temper addon compiles file"
slug: graph-edge-temper-addon-compiles-file
domain-parent-slug: page-type/old-graph-edge
code-type: addon-compiles-file
roots: true
---

# Definition

- **Graph edge temper addon compiles file** — the edge from an addon to a file the compiler its build runs takes as input.

# Design

The files this names are the ones the `tsconfig.json` beside the addon includes.

An addon with no `tsconfig.json` beside it draws no edge.
