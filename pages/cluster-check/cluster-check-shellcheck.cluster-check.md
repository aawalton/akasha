---
page-type-slug: cluster-check
id: b19ac163-b609-50d5-8ce8-3fb015ed4b76
title: "Shellcheck check"
runner-name: shellcheck
script: akasha:infra/cluster-checks/src/checks/check-shellcheck.ts
dispatch-node-types:
  - kind: sh-file
image: "debian:bookworm-slim"
slug: cluster-check-shellcheck
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Shellcheck check** — Every shell script in the tree passes shellcheck.
