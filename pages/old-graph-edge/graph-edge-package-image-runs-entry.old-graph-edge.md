---
id: 5104809c-f130-54f7-ba6b-0ae7dee0b759
page-type-slug: old-graph-edge
title: "Graph edge package image runs entry"
slug: graph-edge-package-image-runs-entry
domain-parent-slug: domain/graph-edge-package
code-type: image-runs-entry
roots: true
---

# Definition

- **Graph edge package image runs entry** — the edge from a package the generator builds an image for to the file that image's container starts.

# Design

The entry is read from the generator's rule and the image's stated runtime command, never from the Dockerfile it writes.

An image stating no runtime command starts `src/server.ts` under its own directory.

A runtime command naming a working directory resolves its script against that directory.

A runtime command reaching no `bun run`, or naming no TypeScript after it, refuses the reading.

A command Kubernetes states over the image draws no edge here.

# Rules

## Entry Not Copy

**Draw this edge to the file the command starts, never to what the image's copy lines take in.**

A copy takes whole directories, so drawing off one roots every dead file inside them, and forever.

What an image carries is a different edge.

Import closure carries the rest of the source.
