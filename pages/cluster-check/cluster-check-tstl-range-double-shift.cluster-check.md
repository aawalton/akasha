---
page-type-slug: cluster-check
id: 4f88ff89-d8f8-5020-a6f9-b537ebbad72a
title: "TSTL range double shift check"
runner-name: tstl-range-double-shift
script: packages/temper/shared/build-deploy/checks/src/check-tstl-range-double-shift.ts
closure-policy: import-graph
depends-on:
  - addon-build
slug: cluster-check-tstl-range-double-shift
domain-parent-slug: page-type/cluster-check
---

# Definition

- **TSTL range double shift check** — No compiled Lua loop indexes an array with its own 1-based loop variable plus one.
