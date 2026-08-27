---
id: 580ada36-2dc2-5543-9b5a-d6a6ca00dad1
page-type-slug: domain
title: "Cluster provisioning"
slug: cluster-provisioning
domain-parent-slug: page-type/cluster
settled: true
---

# Definition

- **Cluster provisioning** — bringing an empty cluster up to where the pipeline can run.

# Design

`pipeline-orchestrator` is not in the chain. It ships as steps in the main pipeline's `preparation` workflow.
