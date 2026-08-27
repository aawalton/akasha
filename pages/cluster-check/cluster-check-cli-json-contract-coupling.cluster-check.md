---
page-type-slug: cluster-check
id: c94746f9-9fb4-521d-a9f3-70db60e30002
title: "CLI JSON contract coupling check"
runner-name: cli-json-contract-coupling
script: infra/cluster-checks/src/checks/check-cli-json-contract-coupling.ts
dispatch-node-types:
  - kind: ts-file
  - kind: tsx-file
slug: cluster-check-cli-json-contract-coupling
domain-parent-slug: page-type/cluster-check
---

# Definition

- **CLI JSON contract coupling check** — Every strict contract schema a CI-excluded test reads is typed against its producer.
