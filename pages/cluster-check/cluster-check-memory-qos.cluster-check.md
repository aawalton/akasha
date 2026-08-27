---
page-type-slug: cluster-check
id: 947cacd7-0b36-5661-839e-a94c644c4bd1
title: "Memory QoS check"
runner-name: memory-qos
script: infra/cluster-checks/src/checks/check-memory-qos.ts
tree-sha: true
dispatch-node-types:
  - kind: yaml-file
  - kind: yml-file
  - kind: workflow
slug: cluster-check-memory-qos
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Memory QoS check** — Every container in a Kubernetes manifest sets a memory request and limit to the same value.
