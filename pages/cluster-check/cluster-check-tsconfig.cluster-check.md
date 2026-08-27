---
page-type-slug: cluster-check
id: 909b43ed-0e2b-59ae-8d18-a9e0cfda643f
title: "Tsconfig check"
runner-name: tsconfig
script: akasha:infra/cluster-checks/src/checks/check-tsconfig.ts
tree-sha: true
dispatch-node-types:
  - kind: package
  - kind: json-file
always-run: true
slug: cluster-check-tsconfig
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Tsconfig check** — Every workspace tsconfig.json follows the conventions its package type sets, references included.
