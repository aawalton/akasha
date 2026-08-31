---
page-type-slug: cluster-check
id: 3a889289-9f54-54a8-9b17-f310ac4e77d5
title: "Widget payload shape mirror check"
runner-name: widget-payload-shape-mirror
script: akasha:infra/cluster-checks/src/checks/check-widget-payload-shape-mirror.ts
dispatch-node-types:
  - kind: swift-file
    under: akasha:akasha/code-system/ios-component/ios-components
  - kind: swift-file
    under: akasha:akasha/code-system/ios-component/ios-components
slug: cluster-check-widget-payload-shape-mirror
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Widget payload shape mirror check** — Every mirrored iOS widget payload declares one field per name its wire vocabulary carries.
