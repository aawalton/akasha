---
page-type-slug: cluster-check
id: b84343cd-c24f-57c9-bb97-30fa29962d32
title: "Mock module surface check"
runner-name: mock-module-surface
script: akasha:infra/cluster-checks/src/checks/check-mock-module-surface.ts
tree-sha: true
dispatch-node-types:
  - kind: ts-file
  - kind: tsx-file
slug: cluster-check-mock-module-surface
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Mock module surface check** — A test's mock.module factory is an inline object with a key for every export it replaces.
