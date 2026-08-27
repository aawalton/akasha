---
page-type-slug: cluster-check
id: 1b409c4d-7d39-55e5-913c-edc6af3124d1
title: "Image tools check"
runner-name: image-tools
script: tools/commands/check-image-tools.ts
dispatch-node-types:
  - kind: workflow
  - kind: ts-file
    under: tools/lib/workflow-surface
closure-policy: import-graph
slug: cluster-check-image-tools
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Image tools check** — Every command a pipeline step runs uses only binaries the container image for that step carries.
