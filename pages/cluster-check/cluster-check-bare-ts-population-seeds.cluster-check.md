---
page-type-slug: cluster-check
id: 9954080a-3de5-5be0-89f8-06d80e271660
title: "Bare TS population seeds check"
runner-name: bare-ts-population-seeds
script: akasha:tools/commands/check-bare-ts-population-seeds.ts
dispatch-node-types:
  - kind: ts-file
    under: tools/lib/check-workflow
slug: cluster-check-bare-ts-population-seeds
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Bare TS population seeds check** — A check's dispatch population selects fewer TypeScript files than the whole repo, or is allowlisted.
