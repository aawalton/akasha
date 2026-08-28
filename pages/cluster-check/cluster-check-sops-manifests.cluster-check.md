---
page-type-slug: cluster-check
id: 7e1bc004-c5bc-5de8-a134-43ca07715023
title: "SOPS manifests check"
runner-name: sops-manifests
script: akasha:infra/cluster-checks/src/checks/check-sops-manifests.ts
tree-sha: true
dispatch-node-types:
  - kind: yaml-file
  - kind: yml-file
environment: '{"SOPS_AGE_KEY":{"secret":"AGE_SECRET_KEY"}}'
slug: cluster-check-sops-manifests
domain-parent-slug: page-type/cluster-check
---

# Definition

- **SOPS manifests check** — Every SOPS-encrypted manifest decrypts, and what it decrypts to is something kubectl accepts.
