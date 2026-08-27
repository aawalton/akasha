---
page-type-slug: cluster-check
id: a317bdcd-dc68-5b8c-ad77-3acb61706206
title: "TI clean source zero check"
runner-name: ti-clean-source-zero
script: akasha:tools/commands/check-ti-clean-source-zero.ts
dispatch-node-types:
  - kind: ts-file
    under: packages/temper
slug: cluster-check-ti-clean-source-zero
domain-parent-slug: page-type/cluster-check
---

# Definition

- **TI clean source zero check** — Every addon marked tiClean calls no raw table.insert or table.remove.
