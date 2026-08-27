---
page-type-slug: cluster-check
id: 503b55b9-91fa-546e-a442-080ed04dbb9a
title: "Dep versions check"
runner-name: dep-versions
script: akasha:infra/cluster-checks/src/checks/check-dep-versions.ts
dispatch-node-types:
  - kind: package
slug: cluster-check-dep-versions
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Dep versions check** — Every dependency that must be pinned exactly carries an exact version, not a range.
