---
page-type-slug: cluster-check
id: b81b2181-9c96-5fe7-8592-6d8ea355073e
title: "Test step paths check"
runner-name: test-step-paths
script: infra/cluster-checks/src/checks/check-test-step-paths.ts
dispatch-node-types:
  - kind: ts-file
  - kind: tsx-file
  - kind: package
slug: cluster-check-test-step-paths
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Test step paths check** — Every test file sits inside a workspace root the root package.json declares.
