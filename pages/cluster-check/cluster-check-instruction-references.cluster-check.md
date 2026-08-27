---
page-type-slug: cluster-check
id: 3960b02c-79bd-5560-a1d6-0c2ec8b33db7
title: "Instruction references check"
runner-name: instruction-references
script: akasha:infra/cluster-checks/src/checks/check-instruction-references.ts
dispatch-node-types:
  - kind: ts-file
  - kind: tsx-file
  - kind: js-file
  - kind: jsx-file
  - kind: css-file
  - kind: json-file
  - kind: yaml-file
  - kind: yml-file
  - kind: toml-file
  - kind: sh-file
  - kind: sql-file
  - kind: md-file
  - kind: txt-file
  - kind: swift-file
  - kind: lua-file
  - kind: rust-file
  - kind: dockerfile-file
  - kind: systemd-unit-file
slug: cluster-check-instruction-references
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Instruction references check** — No tracked text file in the repository names a document in the instructions repository.

# Design

This check outlives the world it names.

# Intent

This check counts nothing.
