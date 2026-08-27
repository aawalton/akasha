---
page-type-slug: cluster-check
id: a1a568ee-4e73-591d-baf8-d08c64014066
title: "Verdict emitter chokepoint check"
runner-name: verdict-emitter-chokepoint
script: akasha:infra/cluster-checks/src/checks/check-verdict-emitter-chokepoint.ts
dispatch-node-types:
  - kind: ts-file
    under: packages/infra/checks/src/checks
slug: cluster-check-verdict-emitter-chokepoint
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Verdict emitter chokepoint check** — Every check script hands its verdict to the shared reporter rather than printing one.
