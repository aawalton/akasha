---
page-type-slug: cluster-check
id: e40560e2-58b8-561d-9de3-99afd2a7ce23
title: "Checksum annotation substitution check"
runner-name: checksum-annotation-substitution
script: akasha:infra/cluster-checks/src/checks/check-checksum-annotation-substitution.ts
always-run: true
slug: cluster-check-checksum-annotation-substitution
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Checksum annotation substitution check** — Every constant checksum/* pod annotation has a substitution site in the package that emits it.
