---
page-type-slug: cluster-check
id: cb48728b-9b77-579e-98c0-ec37b334864e
title: "Generated suffix check"
runner-name: generated-suffix
script: akasha:infra/cluster-checks/src/checks/check-generated-suffix.cli.ts
dispatch-node-types:
  - kind: ts-file
  - kind: tsx-file
slug: cluster-check-generated-suffix
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Generated suffix check** — A source file whose leading comment says a machine produced it is named with a .generated.ts suffix.
