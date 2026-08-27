---
page-type-slug: cluster-check
id: 460f9744-5575-5dc1-abdb-ac2d91dc8d58
title: "Lib sets stale capture check"
runner-name: lib-sets-stale-capture
script: akasha:infra/cluster-checks/src/checks/check-lib-sets-stale-capture.ts
dispatch-node-types:
  - kind: ts-file
    under: packages/temper
slug: cluster-check-lib-sets-stale-capture
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Lib sets stale capture check** — No module-scope binding captures a LibSets field some module rebinds at runtime.
