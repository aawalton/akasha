---
id: ce4566df-080f-5ba4-93cf-11fbdea98982
page-type-slug: ops-command
title: "Ops check-bare-ts-population-seeds"
slug: ops-check-bare-ts-population-seeds
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - page-type/cluster-check
  - page-type/ops-command
command-path: tools/commands/check-bare-ts-population-seeds.ts
path: check-bare-ts-population-seeds
---

# Definition

- **Ops check-bare-ts-population-seeds** — ruling that a check's dispatch seeds select fewer files than the whole population, or say so.

# Design

The checks ruled on are the steps this repository composes, so what is ruled on is what CI runs.

A check named in a table and composed into no step withholds the verdict rather than leaving quietly.

A scope term selecting every member of its population is refused exactly as a bare population is.

# Help

Rule that every check's `dispatchNodeTypes` either selects strictly fewer files than the unscoped population of its kind, or says so out loud.

A check seeded on the bare `ts-file` population wakes on every TypeScript edit in the repo. That is sometimes right and usually not, and the two look identical from the step: a seed that over-covers reads as thorough while it pays for every unrelated change, and a scope term that selects the whole population reads as a narrowing while dispatching identically. Both are refused here unless the check stands in `ALLOWLISTED_REPO_WIDE_TS_SCANNERS` with a written reason.

The checks it rules on are the steps `checkWorkflow(codeRoot)` composes, from `tools/lib/check-workflow/index.ts` — the registry CI itself runs, so what this certifies is what CI runs. A check named in a table under `tools/lib/check-workflow` and composed into no step is one this run could not examine, which withholds the verdict rather than quietly leaving it out.
