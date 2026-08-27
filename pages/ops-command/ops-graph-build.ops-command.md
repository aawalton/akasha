---
id: 42eeacfb-cc0f-4c3e-8df7-07978261167f
page-type-slug: ops-command
title: "Ops graph build"
slug: ops-graph-build
domain-parent-slug: domain/ops-graph
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/graph/build.ts
path: graph build
---

# Definition

- **Ops graph build** — the graph assembled at one tree sha, and what it holds.

# Help

Assemble the graph at the tree sha named, using the engine this repository holds,
and print how many nodes and edges it came to. Nothing is written anywhere: the
engine keeps its snapshots in memory, so this answers whether the graph builds
rather than leaving one behind for a later run to read.

That is what makes it worth a step of its own ahead of the checks. Every check
assembles the graph for itself, so a tree the engine cannot build fails all of
them at once with the same fault reported many times over. Running it once first
names the fault once.

A build holding no node at all is refused rather than reported, because an empty
graph and a graph of a tree with nothing in it read the same, and the counts are
printed so the reading says what it looked at rather than only that it finished.
