---
page-type-slug: cluster-check
id: 83f766ea-9b0c-5656-a742-6b107446afef
title: "Addon inline handler dispatch check"
runner-name: addon-inline-handler-dispatch
script: packages/temper/shared/build-deploy/checks/src/check-addon-inline-handler-dispatch.ts
dispatch-node-types:
  - kind: ts-file
    under: packages/temper
slug: cluster-check-addon-inline-handler-dispatch
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Addon inline handler dispatch check** — Every inline XML handler touching a governed namespace is one call into that namespace.
