---
id: 9de854ac-0d48-556c-91c4-15eef2a3d1f6
page-type-slug: old-graph-node-producer
title: "Graph node producer Temper addon"
slug: graph-node-producer-temper-addon
domain-parent-slug: page-type/old-graph-node-producer
code-name: temper-addon
producer-path: tools/lib/graph/producers/temper-addon/temper-addon.node.producer.ts
nodes-slugs:
  - graph-node-temper-addon
depends-on-slugs:
  - old-graph-node-producer/graph-node-producer-package
---

# Definition

- **Graph node producer Temper addon** — the producer that emits an addon for every package that declares itself one.

# Design

A package declares itself an addon by carrying an `addon.json` this producer can read.

A package that builds no Lua bundle is not an addon here.

The addons the bundle distributes are some of these, and that set does not decide what is an addon.
