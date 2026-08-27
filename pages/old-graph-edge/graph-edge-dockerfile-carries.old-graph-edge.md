---
id: 0648d24b-ad07-5c34-b2e6-042f142241b1
page-type-slug: old-graph-edge
title: "Graph edge dockerfile carries"
slug: graph-edge-dockerfile-carries
domain-parent-slug: page-type/old-graph-edge
code-type: dockerfile-carries
---

# Definition

- **Graph edge dockerfile carries** — the edge from a hand-written image recipe to what its build copies in.

# Design

Every image recipe a commit holds is hand-written.

The edge is read from the recipe's own copy lines.

A copy's source is read against the recipe's own directory, then against the repository root.

A copied directory draws the edge to the package standing at that path, and to none of the files inside it.

A copy of the whole build context draws no edge.

A copy out of an earlier build stage draws no edge.

A copy naming a path the commit does not hold draws no edge.
