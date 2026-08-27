---
page-type-slug: cluster-check
id: 48036556-4741-592f-b514-e5d3f9eda0d9
title: "Git guard both forms check"
runner-name: git-guard-both-forms
script: akasha:infra/cluster-checks/src/checks/check-git-guard-both-forms.ts
always-run: true
slug: cluster-check-git-guard-both-forms
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Git guard both forms check** — Every .git guard in the code and instructions trees accepts a .git file, not just a directory.
