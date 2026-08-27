---
page-type-slug: cluster-check
id: 56f061c4-2583-5865-917c-143abf0f9008
title: "Functional type check"
runner-name: functional-type
script: infra/cluster-checks/src/checks/check-functional-type.ts
dispatch-node-types:
  - kind: ts-file
  - kind: tsx-file
  - kind: package
slug: cluster-check-functional-type
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Functional type check** — Every workspace package.json declares a functionalType matching the one its own shape implies.

# Design

An addon is marked by a `tstl` block in a tsconfig the workspace carries or extends, never by anything the workspace declares as a dependency.
