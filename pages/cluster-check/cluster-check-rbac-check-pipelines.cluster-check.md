---
page-type-slug: cluster-check
id: b1568697-f918-5a75-b0de-916ca11ca6ab
title: "RBAC check pipelines"
runner-name: rbac-check-pipelines
script: akasha:tools/commands/check-rbac-pipelines.ts
dispatch-node-types:
  - kind: workflow
  - kind: namespace-role
  - kind: ts-file
    under: tools/lib/cluster-rbac
slug: cluster-check-rbac-check-pipelines
domain-parent-slug: page-type/cluster-check
---

# Definition

- **RBAC check pipelines** — Every kubectl command a pipeline step runs is covered by a permission the engine holds.
