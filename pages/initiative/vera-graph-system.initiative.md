---
id: c4600194-4f2e-4aea-b221-b4fbdd09fb14
page-type-slug: initiative
slug: vera-graph-system
persona-slug: vera
domain-slug: domain/graph-system
parent-slug: aine-global
---

# Intent

- Every node type and edge type the graph carries is worth what it costs.
- No node the graph holds asserts something that is not true.
- No edge the graph draws asserts something that is not true.
- The old graph is gone.
- A producer can answer about one node without producing every node.
- Nothing the graph has already worked out is worked out again.
- No held answer outlives the shape it was written in.
- Whoever asks the graph gets an answer, not pieces to put together.

# Design

Two graphs stand in akasha. The old one carried 129 types, 51 node and 78 edge; the graph carries one node type and five edge types. What separates them is duplication rather than location, and this initiative ends with one of each and nothing shadowing it.

A type earns its place by making a question answerable, rather than by having a reader today.

The intents are listed in the order they close. An edge's truth rests on both its ends, so a node asserting something false makes every edge touching it false as well. The last is worked only once every line above it is met, there being no point shaping answers over a set still moving or a graph still doubled.

Holding an answer and dropping a stale one are two halves of one thing, so they stand next to each other.

## How the work is shaped

The first intent is the whole judgement, and the three under it follow from it. The 129 old type pages are read before the set is settled, being the only surviving record of what the old graph could answer.

Each type is built, its truth settled at that moment, and the old producers answering it deleted in the same piece of work, so the two graphs never stand side by side longer than one piece of work.

The last four intents are one body of work rather than four. Targeting, holding answers, dropping stale ones and answering more than one hop are all the same index, and splitting them between seats yields four half-indexes.

Everything else runs in parallel, and as wide as there are seats to run it. A type is a piece of work one seat carries end to end — settled, built, its old producers deleted — and types do not wait on each other.

## What Alan settled on 2026-08-27

He approves the generalized structure of the node and edge types. Their names, definitions and invariants are written without further approval, and the `Alan Approves` rule on `domain/mp-graph` is met for this piece of work by his approval of that structure. This release covers this piece of work and not the next.

Distinctions are carried as attributes rather than spelled as types. Edges are defined by filtering on attributes, and questions are asked the same way, so the set lands well under the 21 types the previous run proposed.

One file node type carries both its extension and, for a page, its page type, as attributes. Nothing splits into a second node type for a distinction an attribute already carries.

## Standing rulings

The old graph does not build, so nothing can be measured against it running. Its pages are the only surviving record of what it answered.

Old producers go one at a time as the types they answered land. The old engine, its directory and the workstation service pinned to it go together, and that is the last act before the answering work.

The code-editor repository is out of scope, by Alan's ruling on 2026-08-26. No code-editor node enters the graph.

A node names the repository it lives in, by Alan's ruling on 2026-08-26. A thing living in no repository is therefore not a node: an external package lives in a registry and a host lives on a network, and both are carried as attributes instead.

# Notes

The node line is nearly free today, the only node type being `file` and its nodes coming from what git tracks. It stops being free as further node types land, each claiming something a file's existence does not settle.

`edgesInto` answers a question about one node by producing every node in every repository and re-deriving each one's edges. It is what the targeting line is aimed at.

The `Said` memo at `build-context.ts` is the one held answer today, keyed by a file's git blob oid and a mark hashing the graph engine's own import closure, so it drops itself when an extractor changes.

`cache/closure/closure.ts` holds the only transitive walk in the repository, written by hand because the graph answers one hop. It is what the last intent is aimed at.

`domain/mp-graph` writes its Condition and its `Alan Approves` rule in the word "kind", which no domain defines. `domain/graph-producer` says "node type" and "edge type" for the same thing. Whether "kind" gives way to "type" everywhere is open; the intents here are settled case by case.

`page-type/graph-edge` defines an edge as "one link from one node to another", while every page under it describes an edge type rather than a link.
