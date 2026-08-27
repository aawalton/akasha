---
page-type-slug: cluster-check
id: dca465d9-dfa8-58b2-ba20-43c607168993
title: "Health samples stream check"
runner-name: health-samples-stream
script: akasha:infra/cluster-checks/src/checks/check-health-samples-stream.ts
dispatch-node-types:
  - kind: sh-file
slug: cluster-check-health-samples-stream
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Health samples stream check** — The iOS health-sample drain advances its saved cursor only inside the upload POST's success arm.
