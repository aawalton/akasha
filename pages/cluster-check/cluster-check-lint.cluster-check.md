---
page-type-slug: cluster-check
id: f689d85d-b861-558c-9e2f-202cace935bd
title: "Lint check"
runner-name: lint
script: akasha:infra/cluster-checks/src/checks/lint-verdict.ts
args:
  - "."
dispatch-node-types:
  - kind: ts-file
  - kind: tsx-file
  - kind: js-file
  - kind: jsx-file
  - kind: json-file
always-run: true
image: "debian:bookworm-slim"
resources:
  request-cpu: 1500m
slug: cluster-check-lint
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Lint check** — Biome reports no error-level diagnostic across the source files it opens.
