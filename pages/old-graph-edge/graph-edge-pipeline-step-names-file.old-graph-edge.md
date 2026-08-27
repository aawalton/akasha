---
id: 9bfced6e-fee8-5781-b7c0-25aedc9c17d9
page-type-slug: old-graph-edge
title: "Graph edge pipeline step names file"
slug: graph-edge-pipeline-step-names-file
domain-parent-slug: domain/graph-edge-pipeline
code-type: step-names-file
---

# Definition

- **Graph edge pipeline step names file** — the edge from a step to a file its commands name.

# Design

A path with no root on it is read against the code checkout the step's pod starts in.

A path rooted at a variable other than `$WS`, `$WORKSPACE` or `$AKASHA_ROOT` is left where it stands.

Only a TypeScript file stands at the far end of this edge.
