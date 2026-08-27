---
page-type-slug: cluster-check
id: 637e2b0b-9d88-53a0-a6c5-fce6681bf696
title: "Guarded resolve check"
runner-name: guarded-resolve
script: akasha:infra/cluster-checks/src/checks/check-guarded-resolve.ts
dispatch-node-types:
  - kind: ts-file
  - kind: tsx-file
slug: cluster-check-guarded-resolve
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Guarded resolve check** — No existsSync guard silently skips work over a path git already tracks.
