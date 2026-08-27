---
page-type-slug: cluster-check
id: 38b04e59-7906-5971-8e67-8a5022ea4eed
title: "Client page access boundary check"
runner-name: client-page-access-boundary
script: akasha:infra/cluster-checks/src/checks/check-client-page-access-boundary.ts
dispatch-node-types:
  - kind: ts-file
  - kind: tsx-file
slug: cluster-check-client-page-access-boundary
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Client page access boundary check** — A file marked "use client" reads and writes the pages table only through the shared pages-ui hooks.
