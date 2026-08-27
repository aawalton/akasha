---
page-type-slug: cluster-check
id: 968a4516-c91c-5c10-b00c-b6c6618b1e75
title: "Unused deps check"
runner-name: unused-deps
script: akasha:infra/cluster-checks/src/checks/check-unused-deps.ts
tree-sha: true
dispatch-node-types:
  - kind: ts-file
  - kind: tsx-file
  - kind: yaml-file
  - kind: yml-file
  - kind: package
  - kind: css-file
  - kind: sh-file
  - kind: dockerfile-file
  - kind: json-file
  - kind: lockfile-package
  - kind: lock-file
resources:
  request-cpu: 1500m
  limit-memory: 2Gi
slug: cluster-check-unused-deps
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Unused deps check** — Every dependency a workspace declares in its package.json is used somewhere in that workspace.
