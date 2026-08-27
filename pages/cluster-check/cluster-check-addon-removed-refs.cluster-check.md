---
page-type-slug: cluster-check
id: e68a5afd-b8af-5771-86ea-77eae194f481
title: "Addon removed refs check"
runner-name: addon-removed-refs
script: packages/temper/shared/build-deploy/checks/src/check-addon-removed-refs.ts
closure-policy: import-graph
depends-on:
  - addon-build
slug: cluster-check-addon-removed-refs
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Addon removed refs check** — No built addon bundle names a global belonging to a removed external addon.
