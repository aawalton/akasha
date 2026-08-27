---
id: 90a639cb-afd1-5cea-bf83-9b317e6034e1
page-type-slug: old-graph-edge
title: "Graph edge recipe input synth"
slug: graph-edge-recipe-input-synth
domain-parent-slug: domain/graph-edge-recipe-input
code-type: synth-recipe-input
attributes-slugs:
  - graph-edge-attribute-path
---

# Definition

- **Graph edge recipe input synth** — the edge from a synth module to a file beside it that is not TypeScript.

# Design

A file standing beside a synth module is an input to it, whatever in the module reads it.

The edge lands only on a file directly in the module's own directory.

TypeScript beside a synth module is reached as an import instead.
