---
page-type-slug: cluster-check
id: 5b4d4828-81b7-5a2e-82db-7f882c0e17df
title: "TSTL colon dot self shift check"
runner-name: tstl-colon-dot-self-shift
script: akasha:temper/shared-build-deploy-checks/src/check-tstl-colon-dot-self-shift.ts
closure-policy: import-graph
depends-on:
  - addon-build
slug: cluster-check-tstl-colon-dot-self-shift
domain-parent-slug: page-type/cluster-check
---

# Definition

- **TSTL colon dot self shift check** — No addon bundle dot-calls a colon-method outside the grandfather baseline.
