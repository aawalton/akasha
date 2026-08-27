---
id: bae099d0-420b-52d8-838b-b9190f512e86
page-type-slug: domain
title: "Node"
slug: node
domain-parent-slug: page-type/cluster
required-reading-slugs:
  - domain/resource-utilization
settled: true
---

# Definition

- **Node** — one machine in a cluster.

# Design

A node's configuration is declared in code and applied whole, rather than changed on the machine.

A node's disks are matched by what they are, never by device path.

The GPU memory a node can use is measured from the card, and is less than the card's nominal size.
