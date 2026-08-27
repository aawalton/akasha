---
page-type-slug: cluster-check
id: 4155ac00-f2b5-5e93-8257-0601795c50cf
title: "Mock module leak check"
runner-name: mock-module-leak
script: akasha:infra/cluster-checks/src/checks/check-mock-module-leak.ts
tree-sha: true
dispatch-node-types:
  - kind: ts-file
  - kind: tsx-file
slug: cluster-check-mock-module-leak
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Mock module leak check** — No mock.module stub replaces an export that other files in the same package also import.
