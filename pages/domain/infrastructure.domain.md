---
id: 61632f90-94e6-5629-bbc5-d23e456aee6d
page-type-slug: domain
title: "Infrastructure"
slug: infrastructure
domain-parent-slug: domain/global
persona-champion-slug: aranya
sequence-slugs:
  - domain/infrastructure-definitions
  - page-type/host
  - domain/resource
settled: true
---

# Definition

- **Infrastructure** — what the system runs on.

# Design

The machines and daemons a pipeline runs on are part of this layer; the pipeline itself is part of the code harness.

The workstation's card holds one workload at a time, so generation and training never run together.

A podman volume more than one thing reaches mounts `:z`, never `:Z`, which relabels it to one container exclusively.
