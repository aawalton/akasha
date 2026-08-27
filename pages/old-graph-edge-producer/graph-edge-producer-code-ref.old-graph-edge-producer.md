---
id: 86ebfdcc-07ff-5a0a-85e8-f242db00a543
page-type-slug: old-graph-edge-producer
title: "Graph edge producer code ref"
slug: graph-edge-producer-code-ref
domain-parent-slug: page-type/old-graph-edge-producer
code-name: code-ref-edge
producer-path: tools/lib/graph/producers/code-ref/code-ref.edge.producer.ts
reads-instructions-path:
  - tools/**
  - services/**
  - packages/**
  - pages/workflow-template/**
edges-slugs:
  - graph-edge-import-code-ref
depends-on-slugs:
  - old-graph-node-producer/graph-node-producer-file
  - old-graph-node-producer/graph-node-producer-package
---

# Definition

- **Graph edge producer code ref** — the producer that links each instructions file to the code it names as a string.

# Design

A test file is left out of the scan, so a test standing in for the bridge is not read as a reference.
