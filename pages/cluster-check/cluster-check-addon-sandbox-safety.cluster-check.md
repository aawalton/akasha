---
page-type-slug: cluster-check
id: 531391ef-d996-5e1e-8c92-080651a39221
title: "Addon sandbox safety check"
runner-name: addon-sandbox-safety
script: akasha:temper/shared-build-deploy-checks/src/check-addon-sandbox-safety.ts
closure-policy: import-graph
depends-on:
  - addon-build
slug: cluster-check-addon-sandbox-safety
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Addon sandbox safety check** — No built addon bundle uses a Lua symbol the ESO sandbox strips.
