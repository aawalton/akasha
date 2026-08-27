---
page-type-slug: cluster-check
id: 5d32a852-b3fd-5029-b241-2c883e0dbf7e
title: "No hardcoded surface check"
runner-name: no-hardcoded-surface
script: akasha:infra/cluster-checks/src/checks/check-no-hardcoded-surface.ts
tree-sha: true
dispatch-node-types:
  - kind: ts-file
  - kind: tsx-file
slug: cluster-check-no-hardcoded-surface
domain-parent-slug: page-type/cluster-check
---

# Definition

- **No hardcoded surface check** — Component source names a surface background class through surfaceClass, never as a literal.
