---
id: ce1e82d6-1b26-4dcb-a561-ac06191849b4
page-type-slug: old-graph-edge
title: "Graph edge k8s synth names file"
slug: graph-edge-k8s-synth-names-file
domain-parent-slug: domain/graph-edge-k8s
code-type: synth-names-file
attributes-slugs:
  - graph-edge-attribute-path
---

# Definition

- **Graph edge k8s synth names file** — the edge from a synth module to a file of the deployed tree a container command it states names.

# Design

A container command carrying a shell body names a file by path rather than starting it, and the pod cannot do its work without that file standing there.

A path assembled from constants declared in the module is read as the value those constants give it.

A constant the module does not declare leaves a gap in the path, and what stands after the gap is read on its own.

The edge lands only on a path the code repository tracks.
