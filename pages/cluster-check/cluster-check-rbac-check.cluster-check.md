---
page-type-slug: cluster-check
id: f753feb4-91ed-5701-a6e2-eaddaaf0af26
title: "RBAC check"
runner-name: rbac-check
script: akasha:tools/commands/check-rbac-escalation.ts
dispatch-node-types:
  - kind: namespace-role
  - kind: ts-file
    under: tools/lib/cluster-rbac
slug: cluster-check-rbac-check
domain-parent-slug: page-type/cluster-check
---

# Definition

- **RBAC check** — The deploy ClusterRole holds every apiGroup, resource and verb that any namespace Role grants.
