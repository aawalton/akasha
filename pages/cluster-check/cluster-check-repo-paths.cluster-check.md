---
page-type-slug: cluster-check
id: 9a1692f6-a57b-5099-b727-82f231ce5b8f
title: "Repo paths check"
runner-name: repo-paths
script: akasha:infra/cluster-checks/src/checks/check-repo-paths.ts
dispatch-node-types:
  - kind: md-file
always-run: true
slug: cluster-check-repo-paths
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Repo paths check** — Every repo path written in source or a markdown link points at a tracked file.
