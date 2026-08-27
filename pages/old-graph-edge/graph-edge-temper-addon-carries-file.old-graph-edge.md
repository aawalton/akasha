---
id: c6d721fa-2e66-532b-b661-f177811b57b7
page-type-slug: old-graph-edge
title: "Graph edge temper addon carries file"
slug: graph-edge-temper-addon-carries-file
domain-parent-slug: page-type/old-graph-edge
code-type: addon-carries-file
roots: true
attributes-slugs:
  - graph-edge-attribute-kind
  - graph-edge-attribute-path
---

# Definition

- **Graph edge temper addon carries file** — the edge from an addon to a file it copies rather than compiles.

# Design

Every subdirectory of an addon's metadata directory is copied whole, so what stands in one is carried unnamed.

A file directly in that directory is carried only where the manifest names it.

A file the manifest names is carried whether or not a subdirectory holds it too.

A sibling addon is carried whole from its own directory, under a name the manifest states.

The edge names the directory a file came by, so one carried wholesale says which copy took it.
