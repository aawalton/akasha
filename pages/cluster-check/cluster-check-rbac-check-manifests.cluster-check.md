---
page-type-slug: cluster-check
id: c3facdfb-5322-53b3-a1b9-d93582cb988f
title: "RBAC check manifests"
runner-name: rbac-check-manifests
script: tools/commands/check-rbac-manifests.ts
dispatch-node-types:
  - kind: workflow
  - kind: ts-file
slug: cluster-check-rbac-check-manifests
domain-parent-slug: page-type/cluster-check
---

# Definition

- **RBAC check manifests** — Every manifest the pipeline applies has an RBAC rule granting create and patch on its kinds.
