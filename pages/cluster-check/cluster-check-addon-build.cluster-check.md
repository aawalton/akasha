---
page-type-slug: cluster-check
id: 7422d795-8282-5b8b-a3cb-1f792665a01d
title: "Addon build check"
runner-name: addon-build
script: infra/cluster-checks/src/checks/check-addon-build.ts
tree-sha: true
closure-policy: import-graph
resources:
  request-memory: 6Gi
  limit-memory: 6Gi
slug: cluster-check-addon-build
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Addon build check** — Every deployable addon in the repository builds.
