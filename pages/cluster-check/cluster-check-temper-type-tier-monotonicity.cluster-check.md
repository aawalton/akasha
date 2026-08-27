---
page-type-slug: cluster-check
id: ea59ff60-33b6-50be-a2b1-076161d60753
title: "Temper type tier monotonicity check"
runner-name: temper-type-tier-monotonicity
script: akasha:infra/cluster-checks/src/checks/check-temper-type-tier-monotonicity.ts
tree-sha: true
dispatch-node-types:
  - kind: json-file
    under: packages/temper
slug: cluster-check-temper-type-tier-monotonicity
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Temper type tier monotonicity check** — A Temper package depends only on its own tier or below: shared below game, game below player.
