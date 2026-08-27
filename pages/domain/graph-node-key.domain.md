---
id: db1e1738-a45e-511b-b4cc-a59c966de302
page-type-slug: domain
title: "Graph node key"
slug: graph-node-key
domain-parent-slug: page-type/old-graph-node
---

# Definition

- **Graph node key** — what tells one node from every other.

# Design

A node's key is one string: its type, the repository it stands in, and what the type keys on, joined by colons.

Every part of a key stands on the node itself, rather than among its attributes.

A key is composed from its parts, and nothing that emits a node supplies one.

Nothing recovers a part of a key by parsing the key.

Where a type keys on several things, it composes them into one part, and they stand among its attributes.
