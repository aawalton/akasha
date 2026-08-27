---
page-type-slug: cluster-check
id: 8417e817-990f-5900-a80c-d883d5e8ecc9
title: "HealthKit read only check"
runner-name: healthkit-read-only
script: infra/cluster-checks/src/checks/check-healthkit-read-only.ts
dispatch-node-types:
  - kind: sh-file
slug: cluster-check-healthkit-read-only
domain-parent-slug: page-type/cluster-check
---

# Definition

- **HealthKit read only check** — Every HealthKit authorization request in a shell script passes an empty toShare list.
