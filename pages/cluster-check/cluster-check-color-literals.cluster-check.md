---
page-type-slug: cluster-check
id: f5e64d77-2849-5c85-af6d-853db60d3ce2
title: "Color literals check"
runner-name: color-literals
script: infra/cluster-checks/src/checks/check-color-literals.ts
dispatch-node-types:
  - kind: ts-file
  - kind: tsx-file
  - kind: css-file
slug: cluster-check-color-literals
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Color literals check** — Every color in CSS or TypeScript comes from a design-system token rather than a literal.
