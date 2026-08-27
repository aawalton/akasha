---
page-type-slug: cluster-check
id: 2cf400d5-bde6-5da5-b74e-c7d3949677df
title: "ESO live dir candidate order check"
runner-name: eso-live-dir-candidate-order
script: akasha:infra/cluster-checks/src/checks/check-eso-live-dir-candidate-order.ts
dispatch-node-types:
  - kind: rust-file
slug: cluster-check-eso-live-dir-candidate-order
domain-parent-slug: page-type/cluster-check
---

# Definition

- **ESO live dir candidate order check** — The TypeScript and Rust probes for the ESO live folder both try the OneDrive path first.
