---
page-type-slug: cluster-check
id: 86d8432a-1042-5a4a-9af8-712c32f88505
title: "CI workflow graph check"
runner-name: ci-workflow-graph
script: akasha:tools/commands/check-ci-workflow-graph.ts
dispatch-node-types:
  - kind: workflow
  - kind: ts-file
    under: tools/lib/workflow-surface
  - kind: ts-file
    under: infra/ci-workflows
slug: cluster-check-ci-workflow-graph
domain-parent-slug: page-type/cluster-check
---

# Definition

- **CI workflow graph check** — Every dependsOn in a CI workflow names a real workflow or sibling step, and the graph has no cycle.
