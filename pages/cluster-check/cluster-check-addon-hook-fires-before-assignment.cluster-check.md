---
page-type-slug: cluster-check
id: 39d1ab52-caf5-549a-8dcf-1ffca19ba247
title: "Addon hook fires before assignment check"
runner-name: addon-hook-fires-before-assignment
script: akasha:temper/shared-build-deploy-checks/src/check-addon-hook-fires-before-assignment.ts
dispatch-node-types:
  - kind: ts-file
    under: temper
slug: cluster-check-addon-hook-fires-before-assignment
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Addon hook fires before assignment check** — No hook installed at addon load fires before the field it calls is assigned.
