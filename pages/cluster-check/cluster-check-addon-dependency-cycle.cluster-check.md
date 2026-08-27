---
page-type-slug: cluster-check
id: 64a48b2b-79aa-5778-848f-c93d90fa56c1
title: "Addon dependency cycle check"
runner-name: addon-dependency-cycle
script: akasha:temper/shared-build-deploy-checks/src/check-addon-dependency-cycle.ts
dispatch-node-types:
  - kind: json-file
    under: temper
slug: cluster-check-addon-dependency-cycle
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Addon dependency cycle check** — No addon depends on itself through the addon.json dependency chain.
