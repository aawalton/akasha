---
page-type-slug: cluster-check
id: 78d20607-fdb9-56a2-9c4f-9ccbd783c178
title: "ESO typings fresh check"
runner-name: eso-typings-fresh
script: akasha:temper/shared-build-deploy-checks/src/check-eso-typings-fresh.ts
dispatch-node-types:
  - kind: ts-file
    under: packages/temper
slug: cluster-check-eso-typings-fresh
domain-parent-slug: page-type/cluster-check
---

# Definition

- **ESO typings fresh check** — Every clone-derived ESO artifact carries an API version stamp, and the stamps all agree.
