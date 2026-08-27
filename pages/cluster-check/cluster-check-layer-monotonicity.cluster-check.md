---
page-type-slug: cluster-check
id: 392b6796-40ae-486d-a2df-62182630e889
title: "Layer monotonicity check"
runner-name: layer-monotonicity
script: infra/cluster-checks/src/checks/check-layer-monotonicity.ts
dispatch-node-types:
  - kind: json-file
slug: cluster-check-layer-monotonicity
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Layer monotonicity check** — No workspace depends on a package whose functional type ranks above its own.

# Design

It judges the dependency entries a package.json declares, never the imports its source makes, so a declared package nothing reaches counts against it and an import with no entry behind it does not.

A package is ranked for how it is deployed rather than for what it exports, so a workspace holding only pure modules ranks high once anything deploys it.
