---
page-type-slug: cluster-check
id: f777ced8-63f8-5f6f-a58c-66cc257ac9f0
title: "YAML usage check"
runner-name: yaml-usage
script: akasha:infra/cluster-checks/src/checks/check-yaml-usage.ts
tree-sha: true
dispatch-node-types:
  - kind: yaml-file
  - kind: yml-file
always-run: true
resources:
  request-memory: 1Gi
  limit-memory: 2Gi
slug: cluster-check-yaml-usage
domain-parent-slug: page-type/cluster-check
---

# Definition

- **YAML usage check** — Every YAML file in the tree is referenced from some source file rather than sitting unused.
