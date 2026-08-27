---
page-type-slug: cluster-check
id: 7c712786-c7f1-5144-90b4-c4482533f49d
title: "Addon sandbox load check"
runner-name: addon-sandbox-load
script: akasha:temper/shared-build-deploy-checks/src/check-addon-sandbox-load.ts
closure-policy: import-graph
depends-on:
  - addon-build
slug: cluster-check-addon-sandbox-load
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Addon sandbox load check** — Every built addon bundle loads without error inside the ESO Lua sandbox.
