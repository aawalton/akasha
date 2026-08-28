---
id: 550170e1-ff4b-5c28-aaf2-3fac8b36b725
page-type-slug: page-type
title: "Cluster"
extends-slug: domain
files: akasha:**/*.cluster.md
body-shape-slug: domain
slug: cluster
plural-slug: clusters
domain-parent-slug: page-type/host
sequence-slugs:
  - domain/cluster-provisioning
  - domain/node
  - domain/workload
  - domain/container-image
settled: true
---

# Definition

- **Cluster** — the machines in Alan's home lab.

# Design

A workload names the class of node it runs on.

# Intent

A workload reaches a node by what it needs, rather than by a class the node carries.

The machines people use day to day run Linux and are nodes in the cluster.

What a person did on one of those machines under Windows, they can still do.

Work stops on a machine the moment a person starts using it.
