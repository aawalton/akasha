---
page-type-slug: cluster-check
id: 1c1738fc-9730-52a5-802f-e9814ee8d37f
title: "No orphan source check"
runner-name: no-orphan-source
script: infra/cluster-checks/src/checks/check-no-orphan-source.ts
always-run: true
slug: cluster-check-no-orphan-source
domain-parent-slug: page-type/cluster-check
---

# Definition

- **No orphan source check** — Every source file under packages/ sits inside a workspace package.
