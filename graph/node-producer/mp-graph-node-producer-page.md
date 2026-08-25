---
page-type-slug: mp-graph-node-producer
title: "Mp graph node producer page"
slug: mp-graph-node-producer-page
domain-parent-slug: mp-graph-node-producer
code-name: page
producer-path: akasha:graph/producers/page.node.producer.ts
reads-path:
  - instructions:pages/**
  - memory:pages/**
  - stories:pages/**
  - books:pages/**
  - akasha:**
nodes-slugs:
  - mp-graph-node-page
---

# Definition

- **Mp graph node producer page** — the producer that reads every page file and emits a node for each.
