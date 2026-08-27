---
page-type-slug: cluster-check
id: 91472fa1-2426-59e6-8ba8-440c91909306
title: "ESO global decl consistency check"
runner-name: eso-global-decl-consistency
script: akasha:infra/cluster-checks/src/checks/check-eso-global-decl-consistency.ts
dispatch-node-types:
  - kind: ts-file
    under: temper
slug: cluster-check-eso-global-decl-consistency
domain-parent-slug: page-type/cluster-check
---

# Definition

- **ESO global decl consistency check** — No hand-written decl declares a global the generated ESO surface exposes only as a method.
