---
page-type-slug: cluster-check
id: 9d85929a-4a68-5769-8b6d-8523f8b9e4dc
title: "Client env inlined check"
runner-name: client-env-inlined
script: akasha:infra/cluster-checks/src/checks/check-client-env-inlined.ts
slug: cluster-check-client-env-inlined
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Client env inlined check** — Every client NEXT_PUBLIC_* read is a plain process.env access a vite define replaces.
