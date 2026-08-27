---
page-type-slug: cluster-check
id: 1b1f991b-e1df-51f7-8f24-25d9eb1e00e2
title: "Bin mode check"
runner-name: bin-mode
script: akasha:infra/cluster-checks/src/checks/check-bin-mode.ts
dispatch-node-types:
  - kind: package
slug: cluster-check-bin-mode
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Bin mode check** — Every file a workspace package.json names as a bin command is committed to git with mode 100755.
