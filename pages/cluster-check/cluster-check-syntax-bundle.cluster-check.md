---
page-type-slug: cluster-check
id: 37ae7c32-29e2-5138-af6d-c30e5a9de4db
title: "Syntax bundle check"
runner-name: syntax-bundle
script: akasha:infra/cluster-checks/src/checks/check-syntax-bundle.ts
tree-sha: true
dispatch-node-types:
  - kind: ts-file
  - kind: tsx-file
always-run: true
resources:
  request-cpu: 1
  request-memory: 2Gi
  limit-memory: 4Gi
slug: cluster-check-syntax-bundle
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Syntax bundle check** — TypeScript source files carry none of the syntax patterns the registered scanners reject.
