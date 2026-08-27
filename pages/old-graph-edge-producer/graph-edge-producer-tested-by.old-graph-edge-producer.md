---
id: b3e8d200-3cab-43db-a1c9-0c1dbce02eeb
page-type-slug: old-graph-edge-producer
title: "Graph edge producer tested by"
slug: graph-edge-producer-tested-by
domain-parent-slug: page-type/old-graph-edge-producer
code-name: tested-by
producer-path: tools/lib/graph/producers/test-file/tested-by.edge.producer.ts
edges-slugs:
  - graph-edge-file-tested-by
depends-on-slugs:
  - old-graph-edge-producer/graph-edge-producer-ts-file
  - old-graph-edge-producer/graph-edge-producer-module-file
  - old-graph-edge-producer/graph-edge-producer-k8s-synth
---

# Definition

- **Graph edge producer tested by** — the producer that links each file to the tests importing or opening it.

# Design

The producer reads the edges the TypeScript and module producers emitted, never the source.

A test's static import, dynamic import and re-export each name a subject; a mocked module does not.

A file a test opens at a path resolved against its own location names a subject too.

A file importing the compile-time assertion module is a test too, whatever its name ends in, the assertion it makes being the test.

A test standing in a synth module's folder names that module a subject.
