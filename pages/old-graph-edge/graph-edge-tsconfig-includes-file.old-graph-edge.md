---
id: 65353eb2-fe8b-5b35-b555-0f18a0926635
page-type-slug: old-graph-edge
title: "Graph edge tsconfig includes file"
slug: graph-edge-tsconfig-includes-file
domain-parent-slug: page-type/old-graph-edge
code-type: tsconfig-includes-file
attributes-slugs:
  - graph-edge-attribute-path
---

# Definition

- **Graph edge tsconfig includes file** — the edge from a compiler configuration to a file its own `include` or `files` patterns name.

# Design

A configuration declaring neither `include` nor `files` draws no edge, so the default standing in for them never reaches a file.

The patterns are read from the configuration's own body, never from one it extends.

A pattern climbing out of the configuration's own directory names what it reaches there.

A file a pattern names and `exclude` then takes back draws no edge.

# Rules

## Compiled Not Named

**Root a file because a deploy root's build compiles it, never because a configuration names it.**

An `include` is a glob over a directory, so it names dead files exactly as it names live ones.

`addon-compiles-file` carries an addon's inputs.

A package's tsconfig roots the file and stops.
