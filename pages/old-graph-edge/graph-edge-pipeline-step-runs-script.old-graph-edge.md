---
id: cbb371a2-858d-57e8-bfb2-124f170aace5
page-type-slug: old-graph-edge
title: "Graph edge pipeline step runs script"
slug: graph-edge-pipeline-step-runs-script
domain-parent-slug: domain/graph-edge-pipeline
code-type: step-runs-script
---

# Definition

- **Graph edge pipeline step runs script** — the edge from a step to the file it runs.

# Design

A step spells what it runs as a stated `script` or as a `bun` invocation among its commands, and this edge is drawn from both.

What a `bun` invocation runs is the first token after `bun` standing as a repository path; a later flag's value is an argument rather than the program.

An invocation carrying inline code runs no file, whatever paths that code spells.
