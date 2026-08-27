---
page-type-slug: cluster-check
id: 0225c7e3-2757-52db-ada0-2ca2ca1a2db4
title: "Acyclic packages check"
runner-name: acyclic-packages
script: akasha:infra/cluster-checks/src/checks/check-acyclic-packages.ts
tree-sha: true
dispatch-node-types:
  - kind: package
slug: cluster-check-acyclic-packages
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Acyclic packages check** — No workspace package depends, directly or through others, on a package that depends back on it.
