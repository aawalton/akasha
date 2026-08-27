---
page-type-slug: cluster-check
id: 8a711e9e-65a4-5ed6-adee-9952001bfea2
title: "Tailwind sources check"
runner-name: tailwind-sources
script: infra/cluster-checks/src/checks/check-tailwind-sources.ts
tree-sha: true
dispatch-node-types:
  - kind: css-file
  - kind: package
slug: cluster-check-tailwind-sources
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Tailwind sources check** — Each Tailwind entry stylesheet has an @source covering every UI package it can reach.
