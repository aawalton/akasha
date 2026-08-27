---
page-type-slug: cluster-check
id: 38ba52e7-705f-5dd1-aaf8-ec5ac273ce1b
title: "Checksum substitution reachability check"
runner-name: checksum-substitution-reachability
script: akasha:tools/commands/check-checksum-substitution-reachability.ts
dispatch-node-types:
  - kind: workflow
  - kind: ts-file
    under: tools/lib/workflow-surface
slug: cluster-check-checksum-substitution-reachability
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Checksum substitution reachability check** — No deploy step stamps a checksum from a live cluster object inside a step a content-hash gate skips.
