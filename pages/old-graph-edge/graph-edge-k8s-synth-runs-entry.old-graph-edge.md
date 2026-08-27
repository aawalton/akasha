---
id: 829c2a74-7fa1-5ebb-a6b0-949ccdc13062
page-type-slug: old-graph-edge
title: "Graph edge k8s synth runs entry"
slug: graph-edge-k8s-synth-runs-entry
domain-parent-slug: domain/graph-edge-k8s
code-type: synth-runs-entry
roots: true
attributes-slugs:
  - graph-edge-attribute-path
---

# Definition

- **Graph edge k8s synth runs entry** — the edge from a synth module to the file a container command it states starts.

# Design

The command a synth module states over an image is read here; the command the image itself states is a different edge.

The edge lands only on a path the code repository tracks.

A command naming no TypeScript draws no edge.
