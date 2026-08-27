---
id: 94bee6dc-376a-553c-9a7b-5f8b756eec94
page-type-slug: old-graph-node
title: "Graph node inference service"
slug: graph-node-inference-service
domain-parent-slug: page-type/old-graph-node
code-type: inference-service
attributes-slugs:
  - graph-node-attribute-name
  - graph-node-attribute-hostname
  - graph-node-attribute-source-root
---

# Definition

- **Graph node inference service** — the node for one service the system copies to another machine and runs there.

# Design

A service is a deploy root because the copy leaves this workstation and a registry states the reason.

The machine is an attribute, not part of the type, so the type outlives whichever machine holds the service.

Several services can name one source directory, and each is its own node.

Only the named directory travels, never the package holding it.
