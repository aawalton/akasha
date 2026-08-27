---
id: c0070fac-29e1-5726-8fda-af14bf41cd88
page-type-slug: domain
title: "CI benchmark"
slug: ci-benchmark
domain-parent-slug: page-type/pipeline
---

# Definition

- **CI benchmark** — one CI node's substrate measured against the whole check registry on a cold store.

# Design

The pod is placed by a hostname nodeSelector, never by a node name.

A pod the kubelet rejects is a destroyed run rather than a retried one.

The store is empty at the start of every run, and independent of the node.

Two runs are comparable only where their failures match on name and exit code.

A failure outside the declared set invalidates the run rather than failing it.

The memory request covers the tmpfs size limit as well as the working set.

