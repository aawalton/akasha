---
id: 391bfe57-75ac-5650-a140-f67721887a01
page-type-slug: old-graph-edge-producer
title: "Graph edge producer deploy carries package"
slug: graph-edge-producer-deploy-carries-package
domain-parent-slug: page-type/old-graph-edge-producer
code-name: deploy-carries-package
producer-path: tools/lib/graph/producers/package/deploy-carries-package.edge.producer.ts
edges-slugs:
  - graph-edge-package-deploy-carries
depends-on-slugs:
  - old-graph-node-producer/graph-node-producer-package
---

# Definition

- **Graph edge producer deploy carries package** — the producer that links a deployed thing to the package whose files it reaches.

# Design

The producer runs after every producer drawing an edge it walks, so what it reads is complete.

The first hop out of a deployed node takes any edge type, and every hop after it takes the rooting edge types.
