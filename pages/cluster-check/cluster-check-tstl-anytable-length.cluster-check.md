---
page-type-slug: cluster-check
id: 09080f41-4572-5b82-a069-974675e76d22
title: "TSTL anytable length check"
runner-name: tstl-anytable-length
script: packages/temper/shared/build-deploy/checks/src/check-tstl-anytable-length.ts
closure-policy: import-graph
depends-on:
  - addon-build
slug: cluster-check-tstl-anytable-length
domain-parent-slug: page-type/cluster-check
---

# Definition

- **TSTL anytable length check** — No built addon bundle reads .length on a table it subscripts.
