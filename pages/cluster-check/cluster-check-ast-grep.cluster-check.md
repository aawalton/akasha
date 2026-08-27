---
page-type-slug: cluster-check
id: 26fe1c97-564c-5e93-bfa3-8b3e2dc1790b
title: "AST grep check"
runner-name: ast-grep
script: infra/cluster-checks/src/checks/check-ast-grep.ts
dispatch-node-types:
  - kind: yaml-file
  - kind: yml-file
slug: cluster-check-ast-grep
domain-parent-slug: page-type/cluster-check
---

# Definition

- **AST grep check** — No source file matches one of the ast-grep search patterns declared in the repository.
