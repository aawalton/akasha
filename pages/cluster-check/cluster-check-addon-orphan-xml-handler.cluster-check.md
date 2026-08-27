---
page-type-slug: cluster-check
id: 88af6536-74f3-5685-838f-97b1e009ad33
title: "Addon orphan XML handler check"
runner-name: addon-orphan-xml-handler
script: akasha:temper/shared-build-deploy-checks/src/check-addon-orphan-xml-handler.ts
dispatch-node-types:
  - kind: ts-file
    under: packages/temper
slug: cluster-check-addon-orphan-xml-handler
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Addon orphan XML handler check** — Every symbol an inline XML handler calls is defined in the addon's source.
