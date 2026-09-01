---
id: 01a05aba-55cb-7696-8110-a428e8ffd3f2
page-type-slug: cluster-service
title: "Page store"
slug: page-store
domain-parent-slug: page-type/cluster-service
kind: Deployment
namespace: page-store
resource-name: page-store
---

# Definition

- **Page store** — what a pod reaches the workstation's pages through.

# Design

The pages themselves are held on a workstation and answered there, so what runs in the cluster
carries a pod's request out to that workstation and carries the answer back.

The workstation is named by its private-network name rather than by an address, so the name holds
when the address moves.

A pod reaches this by an ordinary cluster name on an ordinary port, so nothing calling it is
configured with a proxy.

The carrying is done through the tailnet egress that already stands, so no second private-network
node is enrolled for this.
