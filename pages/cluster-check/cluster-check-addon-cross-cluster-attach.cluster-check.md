---
page-type-slug: cluster-check
id: 60a30e9b-08de-578c-b8d3-0d88fc293a63
title: "Addon cross cluster attach check"
runner-name: addon-cross-cluster-attach
script: akasha:temper/shared-build-deploy-checks/src/check-addon-cross-cluster-attach.ts
dispatch-node-types:
  - kind: ts-file
    under: packages/temper
slug: cluster-check-addon-cross-cluster-attach
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Addon cross cluster attach check** — Every function a cross-cluster view promises is attached onto the addon's runtime global.
