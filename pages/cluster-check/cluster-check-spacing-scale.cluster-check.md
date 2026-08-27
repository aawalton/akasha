---
page-type-slug: cluster-check
id: 01d00dd1-3fc2-5baa-9c9f-0f613869e776
title: "Spacing scale check"
runner-name: spacing-scale
script: akasha:infra/cluster-checks/src/checks/check-spacing-scale.ts
dispatch-node-types:
  - kind: swift-file
  - kind: sh-file
slug: cluster-check-spacing-scale
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Spacing scale check** — A Swift widget source takes every gap and padding from the spacing scale, never a bare number.
