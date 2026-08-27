---
id: a9934e36-21cf-5ab4-a8b5-56869a2945c1
page-type-slug: old-graph-edge
title: "Graph edge bunfig preloads file"
slug: graph-edge-bunfig-preloads-file
domain-parent-slug: page-type/old-graph-edge
code-type: bunfig-preloads-file
attributes-slugs:
  - graph-edge-attribute-specifier
---

# Definition

- **Graph edge bunfig preloads file** — the edge from a `bunfig.toml` to a file its `preload` names.

# Design

Every `preload` in the file draws the edge, whichever table it stands under.

A preload spelled as a path is resolved against the `bunfig.toml`'s own directory.

A preload spelled as a specifier is resolved through the named package's exports.

A preload naming a package this repository does not hold draws no edge.
