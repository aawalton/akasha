---
id: 3a73208a-85fb-5802-affd-b182fb11096e
page-type-slug: old-graph-edge
title: "Graph edge temper addon manifest"
slug: graph-edge-temper-addon-manifest
domain-parent-slug: page-type/old-graph-edge
code-type: addon-manifest
roots: true
attributes-slugs:
  - graph-edge-attribute-path
---

# Definition

- **Graph edge temper addon manifest** — the edge from an addon to the file declaring it an addon.

# Design

The manifest is the `addon.json` standing in the addon's own directory, the file addon discovery reads to find the addon at all.

An addon whose directory holds no such file is no addon, so no such edge stands unreached.
