---
page-type-slug: cluster-check
id: d8145bd8-3603-5c69-9d2d-226f3053b5d7
title: "RBAC check cluster grants"
runner-name: rbac-check-cluster-grants
script: akasha:tools/commands/check-rbac-cluster-grants.ts
dispatch-node-types:
  - kind: ts-file
slug: cluster-check-rbac-check-cluster-grants
domain-parent-slug: page-type/cluster-check
---

# Definition

- **RBAC check cluster grants** — The deploy ClusterRole grants create and patch on every cluster-scoped kind the synths emit.
