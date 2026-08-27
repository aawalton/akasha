---
id: 42d65540-0e44-5b1a-a824-92810b97de31
page-type-slug: alert
title: "Node CPU pressure high"
slug: node-cpu-pressure-high
domain-parent-slug: page-type/alert
domain: infrastructure
summary: "Node {{ $labels.instance }} CPU pressure {{ $value | humanizePercentage }} — tasks stalled waiting on CPU"
---

# Definition

- **Node CPU pressure high** — work on a node is spending a large share of its time waiting for CPU.
