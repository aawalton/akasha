---
page-type-slug: cluster-check
id: 8cc4e6c8-b010-5ab7-a3e1-00304af17c6c
title: "Workspaces mainseam check"
runner-name: workspaces-mainseam
script: infra/cluster-checks/src/checks/check-workspaces-mainseam.ts
dispatch-node-types:
  - kind: package
slug: cluster-check-workspaces-mainseam
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Workspaces mainseam check** — Every workspaces entry in the root package.json parses under the code already on main.
