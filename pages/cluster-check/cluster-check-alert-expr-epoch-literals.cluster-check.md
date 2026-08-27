---
page-type-slug: cluster-check
id: 068c5921-6cf4-5c2f-a227-b46b40d8a786
title: "Alert expr epoch literals check"
runner-name: alert-expr-epoch-literals
script: infra/cluster-checks/src/checks/check-alert-expr-epoch-literals.ts
closure-policy: import-graph
slug: cluster-check-alert-expr-epoch-literals
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Alert expr epoch literals check** — No Prometheus alert expression contains an absolute unix timestamp literal.
