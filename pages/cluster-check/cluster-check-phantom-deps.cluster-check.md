---
page-type-slug: cluster-check
id: ccb0da8f-71ad-53d6-b621-c5c7862bce9c
title: "Phantom deps check"
runner-name: phantom-deps
script: akasha:infra/cluster-checks/src/checks/check-phantom-deps.ts
tree-sha: true
dispatch-node-types:
  - kind: ts-file
  - kind: tsx-file
  - kind: package
always-run: true
slug: cluster-check-phantom-deps
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Phantom deps check** — Every package a workspace's source imports is declared in that workspace's package.json.
