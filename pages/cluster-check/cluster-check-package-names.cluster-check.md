---
page-type-slug: cluster-check
id: afadd0b0-7d31-5999-afac-268b8d44a064
title: "Package names check"
runner-name: package-names
script: infra/cluster-checks/src/checks/check-package-names.ts
dispatch-node-types:
  - kind: package
slug: cluster-check-package-names
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Package names check** — A workspace's package name matches its directory path, scoped by its first segment.
