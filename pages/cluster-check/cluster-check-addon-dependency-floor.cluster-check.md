---
page-type-slug: cluster-check
id: b3d5bb59-0488-5042-8563-0a29b6fbbea6
title: "Addon dependency floor check"
runner-name: addon-dependency-floor
script: akasha:temper/shared-build-deploy-checks/src/check-addon-dependency-floor.ts
dispatch-node-types:
  - kind: json-file
    under: packages/temper
slug: cluster-check-addon-dependency-floor
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Addon dependency floor check** — Every dependency floor an addon declares on another addon is met by that addon's version.
