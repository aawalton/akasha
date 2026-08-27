---
page-type-slug: cluster-check
id: 493bf66c-93e5-5b5b-b999-55d1bb65b0f7
title: "Porcelain status boundary check"
runner-name: porcelain-status-boundary
script: akasha:infra/cluster-checks/src/checks/check-porcelain-status-boundary.ts
dispatch-node-types:
  - kind: ts-file
  - kind: tsx-file
  - kind: sh-file
slug: cluster-check-porcelain-status-boundary
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Porcelain status boundary check** — Code reads git status machine output through the shared porcelain module, never column by column.
