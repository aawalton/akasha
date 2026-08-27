---
id: f63092cf-2d2a-588d-ba64-2ca9e06cfc87
page-type-slug: ops-command
title: "Ops pipeline benchmark"
slug: ops-pipeline-benchmark
domain-parent-slug: domain/ops-pipeline
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/pipeline/benchmark.ts
path: pipeline benchmark
---

# Definition

- **Ops pipeline benchmark** — one CI node measured by a pinned job running the whole check registry on an empty store.

# Help

Run the per-node CI benchmark: a node-pinned one-off Job that executes the real preparation + check registry on a cold pod-local store, capturing three metric families — (a) per-phase timings + a pipeline-independent smoke verdict, (b) the in-memory-vs-disk store delta, and (c) the OutOfcpu-burst rate (observed K8s Events + a synthetic capacity-margin sweep).

Defaults to node-06 and BOTH store variants (disk + memory) so a baseline run populates every family. The buildkit-on-node-06 caveat (#14492) is stamped into every report.
