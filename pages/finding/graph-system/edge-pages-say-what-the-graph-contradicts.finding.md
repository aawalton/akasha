---
page-type-slug: finding
title: "Edge pages say what the graph contradicts"
domain-slug: domain/graph-system
---

# Claim

Three lines on the graph's own pages say something the graph contradicts.

`page-type/graph-edge` defines an edge as "one link from one node to another", while every page under that type describes an edge type rather than a link. A reader taking the definition literally would expect one page per edge in a store of a quarter of a million of them.

`page-type/graph-edge` states as a Condition that an edge runs from the node that names another to the one it names. `contains` runs the other way: the child's key is what names the folder, and the edge runs from the folder.

`domain/the-graph` writes its Condition and its `Alan Approves` rule in the word "kind", which no domain defines, where `domain/graph-producer` says "node type" and "edge type" for the same thing. Whether "kind" gives way to "type" everywhere is open.

# Evidence

Read 2026-08-27 in akasha at `bd2e89cfb`. The three lines are on `pages/page-type/graph-edge.page-type.md` (Definition and Condition) and `pages/domain/the-graph.domain.md` (Condition and the `Alan Approves` rule).

The `contains` counterexample was measured: 250,239 edges over akasha on 2026-08-27, with no `contains` edge whose far end was not directly under its near one, the edge running folder to child throughout.

Not measured: whether any reader has acted on the literal Definition, or whether any other edge type also runs against the Condition. The three types built today are `import`, `relation` and `contains`, and only `contains` was checked against it.
