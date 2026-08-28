---
id: 01a04625-d809-7468-9ddd-c403fc72d67e
page-type-slug: all-about-alan-topic
title: "The Graph I Built To Run My Checks"
slug: the-graph-i-built-to-run-my-checks
topic-parents-slugs: how-many-checks-i-run
topic-related-slugs:
  - when-my-docs-are-my-code
  - how-my-services-decide-to-deploy
  - what-the-graph-is-made-of
---

# Definition

- **The Graph I Built To Run My Checks** — the typed graph my checks are defined on, and what made me build it

# Design

At about a hundred checks, performance became the problem.

I solved it by constructing a typed graph — nodes and edges, with node types and edge types.

Basically all the checks are invariant predicates defined on that graph, and the conditions for which changes they should run on are also predicates on that graph.

Building the graph once and using it many times solved the performance issue.

I have not heard anyone else talk about that.

# Questions

What building the graph costs, and whether that cost grows with the number of checks or only with the size of the tree, is unrecorded.

Whether anyone else has built this and not talked about it is unchecked. I have only said I have not heard it.
