---
page-type-slug: cluster-check
id: 8875699f-9ed2-5e86-93c6-1c722970ca21
title: "Run check routing"
runner-name: run-check-routing
script: akasha:tools/commands/check-run-check-routing.ts
dispatch-node-types:
  - kind: workflow
  - kind: ts-file
    under: tools/lib/workflow-surface
always-run: true
slug: cluster-check-run-check-routing
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Run check routing** — Every pipeline step running a check script goes through the shared check runner.
