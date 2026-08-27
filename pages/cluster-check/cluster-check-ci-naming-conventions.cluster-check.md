---
page-type-slug: cluster-check
id: 8c69ac50-b054-5ad8-bd4e-8ec4f5dcd3d5
title: "CI naming conventions check"
runner-name: ci-naming-conventions
script: tools/commands/check-ci-naming-conventions.ts
dispatch-node-types:
  - kind: workflow
  - kind: ts-file
    under: tools/lib/workflow-surface
slug: cluster-check-ci-naming-conventions
domain-parent-slug: page-type/cluster-check
---

# Definition

- **CI naming conventions check** — Every CI workflow and step name is lower-case kebab, and a step name opens with its workflow's.
