---
page-type-slug: cluster-check
id: b4a578f2-a4e1-5e9e-b47c-e76516f8f8c5
title: "Service dockerfiles gitignored check"
runner-name: service-dockerfiles-gitignored
script: infra/cluster-checks/src/checks/check-service-dockerfiles-gitignored.ts
dispatch-node-types:
  - kind: package
  - kind: json-file
  - kind: dockerfile-file
always-run: true
slug: cluster-check-service-dockerfiles-gitignored
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Service dockerfiles gitignored check** — Every generated service Dockerfile output path is untracked by git and covered by .gitignore.
