---
page-type-slug: cluster-check
id: 38b9d81d-2e71-5fa2-b78c-49a8d4cf1352
title: "TSTL this void self drop check"
runner-name: tstl-this-void-self-drop
script: akasha:infra/cluster-checks/src/checks/check-tstl-this-void-self-drop.ts
dispatch-node-types:
  - kind: ts-file
    under: packages/temper
slug: cluster-check-tstl-this-void-self-drop
domain-parent-slug: page-type/cluster-check
---

# Definition

- **TSTL this void self drop check** — No colon-called addon member declares a sole this: void parameter.
