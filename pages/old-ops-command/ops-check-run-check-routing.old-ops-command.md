---
id: b0b7b5c8-10dd-52c5-afdc-0cce0fcc5269
page-type-slug: old-ops-command
title: "Ops check-run-check-routing"
slug: ops-check-run-check-routing
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - page-type/cluster-check
  - page-type/old-ops-command
command-path: tools/commands/check-run-check-routing.ts
path: check-run-check-routing
---

# Definition

- **Ops check-run-check-routing** — ruling that every check a CI step invokes is reached through the runner, not run directly.

# Help

Rule that every check the CI workflows invoke is reached through `infra/cluster-checks/src/run-check.ts`.

Composes every `workflow-template` page in the instructions tree over the code tree, resolves each step's commands under both probe contexts, and reads every `check-*.ts` path out of the resulting shell. A check invoked directly dies at module resolution as a non-zero exit, which CI reads as the branch being at fault rather than the registration; routing it through the runner keeps those two apart. A path the code tree does not carry fails the same way, so both are refused here.

The two trees are named on stdout, because a run pointed at the wrong code checkout would find every script missing, and one pointed at a tree with no workflow pages would certify nothing while reporting clean. Both of those are refusals here, not passes.
