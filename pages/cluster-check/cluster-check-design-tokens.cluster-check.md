---
page-type-slug: cluster-check
id: c2b09235-c896-5036-b0aa-3b5b3bf2880c
title: "Design tokens check"
runner-name: design-tokens
script: infra/cluster-checks/src/checks/check-design-tokens.ts
dispatch-node-types:
  - kind: ts-file
    under: packages/shared/design/tokens
slug: cluster-check-design-tokens
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Design tokens check** — Every design-token color stands in the TypeScript tokens and in tokens.css with one value.
