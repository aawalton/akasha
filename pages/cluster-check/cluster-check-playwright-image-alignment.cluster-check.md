---
page-type-slug: cluster-check
id: d3de2e9a-f7ba-52ed-b916-2455be9d1922
title: "Playwright image alignment check"
runner-name: playwright-image-alignment
script: infra/cluster-checks/src/checks/check-playwright-image-alignment.ts
dispatch-node-types:
  - kind: package
  - kind: json-file
  - kind: sh-file
  - kind: lock-file
slug: cluster-check-playwright-image-alignment
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Playwright image alignment check** — The Playwright version in the manifests, the lockfile, the image tags and the mirror list is one.
