---
page-type-slug: cluster-check
id: bddc14d1-1094-549a-be46-aa2cbd9d6e7e
title: "K8s node selector check"
runner-name: k8s-node-selector
script: akasha:infra/cluster-checks/src/checks/check-k8s-node-selector.ts
tree-sha: true
dispatch-node-types:
  - kind: yaml-file
  - kind: yml-file
  - kind: ts-file
  - kind: tsx-file
slug: cluster-check-k8s-node-selector
domain-parent-slug: page-type/cluster-check
---

# Definition

- **K8s node selector check** — A pod picks its node only by workload class or GPU capacity, never by a machine's hostname or name.
