---
page-type-slug: cluster-check
id: dfdd3499-8120-564c-860b-7154b303a14a
title: "Image tags check"
runner-name: image-tags
script: infra/cluster-checks/src/checks/check-image-tags.ts
tree-sha: true
dispatch-node-types:
  - kind: yaml-file
  - kind: yml-file
  - kind: dockerfile-file
  - kind: workflow
slug: cluster-check-image-tags
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Image tags check** — Every container image in a Kubernetes document or a Dockerfile carries a tag or a digest.
