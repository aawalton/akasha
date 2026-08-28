---
id: 6ad723e7-2e97-503d-95e8-e687b4dba6d8
page-type-slug: domain
title: "The Graph"
slug: the-graph
domain-parent-slug: domain/graph-system
sequence-slugs:
  - page-type/graph-node
  - page-type/graph-edge
  - page-type/graph-node-attribute
  - page-type/graph-edge-attribute
  - page-type/graph-node-producer
  - page-type/graph-edge-producer
  - page-type/graph-node-deriver
settled: true
---

# Definition

- **The Graph** — the one model holding every node and every edge.

# Design

No code-editor node enters the graph.

A node names the repository it lives in.

A thing in no repository is not a node; an external package and a host are attributes.

A node type is a different thing; an attribute is the same thing with a property.

An edge type is a different way of connecting; an attribute is the same way with a property.

A thing is a node type where one file holds many of it, and a file with an attribute where a file holds one.

An edge is polymorphic in its ends wherever its way of connecting is.

# Condition

A kind's name in code is its slug.

# Intent

Nothing outside the graph spells a node's name for itself.

A name that matches no node is refused where it is given, rather than read as a node nothing reaches.

# Rules

## Alan Approves

**Add a node, edge or attribute to akasha's graph only where Alan has approved that kind.**

Every reader asks in these terms, so a kind nobody wanted becomes a word the whole system speaks.

Approving the initiative is not approving a kind.

A kind replacing an old one still needs approval.
