---
page-type-slug: cluster-check
id: 6f25af67-ebd3-5349-bb8a-9d5954eb3c8f
title: "Env unset bash check"
runner-name: env-unset-bash
script: akasha:infra/cluster-checks/src/checks/check-env-unset-bash.ts
always-run: true
slug: cluster-check-env-unset-bash
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Env unset bash check** — Every env -u invocation also clears BASH_ENV.
