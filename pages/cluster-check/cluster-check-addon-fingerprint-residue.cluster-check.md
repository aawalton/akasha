---
page-type-slug: cluster-check
id: 31182975-69c2-5c4b-bd37-6f873fcf8a89
title: "Addon fingerprint residue check"
runner-name: addon-fingerprint-residue
script: akasha:temper/shared-build-deploy-checks/src/check-addon-fingerprint-residue.ts
dispatch-node-types:
  - kind: ts-file
    under: temper
slug: cluster-check-addon-fingerprint-residue
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Addon fingerprint residue check** — No addon source holds a token from a name that addon retired.
