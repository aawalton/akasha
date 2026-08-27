---
page-type-slug: cluster-check
id: dbfc7923-f761-5e60-8a2c-489478c85dbd
title: "Addon owned global clobber check"
runner-name: addon-owned-global-clobber
script: akasha:temper/shared-build-deploy-checks/src/check-addon-owned-global-clobber.ts
dispatch-node-types:
  - kind: ts-file
    under: temper
slug: cluster-check-addon-owned-global-clobber
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Addon owned global clobber check** — Every global an addon writes or saves is claimed by that one addon alone.
