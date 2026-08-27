---
id: ad889189-8f56-5abe-804b-0d15d5232d4c
page-type-slug: old-graph-edge
title: "Graph edge dockerfile compiles entry"
slug: graph-edge-dockerfile-compiles-entry
domain-parent-slug: page-type/old-graph-edge
code-type: dockerfile-compiles-entry
---

# Definition

- **Graph edge dockerfile compiles entry** — the edge from a Dockerfile to the TypeScript entry a build step in it compiles into a binary.

# Design

The entry comes from the build command's own operands, never from what the image copies in.

A build command written as an exec-form array names no entry here.

An operand naming a file the commit does not hold draws no edge.

# Rules

## Compiler Not Copier

**Take the entry the compiler is handed; never root what a `COPY` line brings into the image.**

A `COPY` carries a whole directory, so rooting off one buries every dead file beside the live one.

One build entry roots its imports and their tests.

An operand is an entry only where the compiler reads it.
