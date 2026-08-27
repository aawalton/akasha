---
id: a296456c-abdd-5d7d-a6e2-ed06c8606b18
page-type-slug: domain
title: "Ops talos"
slug: ops-talos
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
  - page-type/cluster
---

# Definition

- **Ops talos** — the commands that stand a cluster up on bare machines and report whether it holds.

# Design

A node's address is given on the command line, never looked up from the node catalog every command here already reads.

The boundary is the cluster's own machines and the plumbing beneath its workloads; nothing an application deploys is installed from here.
