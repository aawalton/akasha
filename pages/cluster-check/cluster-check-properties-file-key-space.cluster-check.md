---
page-type-slug: cluster-check
id: 62823623-929d-5bc8-8259-e95621b6b355
title: "Properties file key space check"
runner-name: properties-file-key-space
script: akasha:infra/cluster-checks/src/checks/check-properties-file-key-space.ts
dispatch-node-types:
  - kind: ts-file
  - kind: tsx-file
slug: cluster-check-properties-file-key-space
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Properties file key space check** — Help strings and comments write a properties file's key map with propertySlug, never propertyId.
