---
page-type-slug: cluster-check
id: 591fc6b8-62e7-5d9f-a629-08fcfa461546
title: "Acyclic imports check"
runner-name: acyclic-imports
script: infra/cluster-checks/src/checks/check-acyclic-imports.ts
tree-sha: true
dispatch-node-types:
  - kind: ts-file
  - kind: tsx-file
  - kind: tsconfig-file
resources:
  limit-memory: 2Gi
slug: cluster-check-acyclic-imports
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Acyclic imports check** — No TypeScript module reachable from a package entry point imports its way back around to itself.
