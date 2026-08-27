---
id: 73caabb0-38cd-52e9-bb25-4cebc19db120
page-type-slug: old-graph-edge
title: "Graph edge sh file sources"
slug: graph-edge-sh-file-sources
domain-parent-slug: page-type/old-graph-edge
code-type: sh-sources-file
roots: true
attributes-slugs:
  - graph-edge-attribute-specifier
---

# Definition

- **Graph edge sh file sources** — the edge from a script to a file it reads into itself before running.

# Design

The path comes from the directive the author wrote for the shell checker, never from evaluating the script.

A script naming the file through a variable declares that name in the directive beside it.

The directive spells a path from the repository root, or from the directory the script stands in.

A directive naming a file outside the repository is left alone.
