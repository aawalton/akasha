---
page-type-slug: cluster-check
id: aaf775a1-21bc-5f76-b67e-a140fb7eb7b2
title: "Tmpfs scratch check"
runner-name: tmpfs-scratch
script: infra/cluster-checks/src/checks/check-tmpfs-scratch.ts
dispatch-node-types:
  - kind: ts-file
  - kind: tsx-file
slug: cluster-check-tmpfs-scratch
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Tmpfs scratch check** — No TypeScript file off the ratchet list creates scratch files under /tmp.
