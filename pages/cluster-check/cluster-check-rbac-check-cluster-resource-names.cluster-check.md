---
page-type-slug: cluster-check
id: aef489ef-9858-5d59-add3-8a96f34f8513
title: "RBAC check cluster resource names"
runner-name: rbac-check-cluster-resource-names
script: tools/commands/check-rbac-cluster-resource-names.ts
dispatch-node-types:
  - kind: ts-file
slug: cluster-check-rbac-check-cluster-resource-names
domain-parent-slug: page-type/cluster-check
---

# Definition

- **RBAC check cluster resource names** — The engine may patch every ClusterRole and ClusterRoleBinding name the synths emit.
