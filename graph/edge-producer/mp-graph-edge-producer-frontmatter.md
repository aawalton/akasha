---
page-type-slug: mp-graph-edge-producer
title: "Mp graph edge producer frontmatter"
slug: mp-graph-edge-producer-frontmatter
domain-parent-slug: mp-graph-edge-producer
code-name: frontmatter
producer-path: akasha:graph/producers/frontmatter.edge.producer.ts
reads-path:
  - instructions:pages/**
  - memory:pages/**
  - stories:pages/**
  - books:pages/**
  - akasha:**
depends-on-slugs:
  - mp-graph-node-producer-page
edges-slugs:
  - mp-graph-edge-page-type
  - mp-graph-edge-extends
  - mp-graph-edge-defined-on
  - mp-graph-edge-domain-parent
  - mp-graph-edge-narrows
  - mp-graph-edge-sequence
  - mp-graph-edge-required-reading
---

# Definition

- **Mp graph edge producer frontmatter** — the producer that reads every page's frontmatter and emits the references it names.
