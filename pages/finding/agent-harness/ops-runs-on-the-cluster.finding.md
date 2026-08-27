---
id: a789a9af-3819-5265-84e5-bc16c3caa0e5
page-type-slug: finding
title: "Ops runs on the cluster"
domain-slug: domain/agent-harness
---

# Claim

`ops` runs on the cluster in two places — a CI step on every pipeline and a CronJob pod — so the premise that `ops` runs only on this workstation, which the `delivery-boundary` theme was built on, is false as stated, and the reachability traversal on project #18789 will return `ops` as code-repo code.

# Evidence

Observed 2026-08-11, in and after the strategy interview that settled the `delivery-boundary` theme. Alan's ruling there: "the ops command itself DOES NOT deploy to the cluster, it runs locally on the workstation. As a result, the ops command should NOT be in the code repo." The theme was scoped around it. He also ruled that code running in CI counts as deployed while code running only under test does not, and that the boundary is settled by reachability over the dependency graph. Project #18789 went out on that basis.

Two sites, both read directly rather than reported.

`packages/infra/ci/workflows/src/prep.workflow.ts:243-254` defines the CI step `preparation-synth-k8s`, `alwaysRun: true`, command `cd /ci-storage/checkouts/${ci.commitSha} && bun ops k8s synth --write`. Every pipeline, and not from a test.

`packages/infra/ci/orphaned-resources-sweep/src/run-orphan-sweep-and-notify.ts:75` calls `Bun.spawn(["bun", "ops", "k8s", "orphaned-resources", "--json"])`. That file runs in a CronJob pod, per the sibling `k8s/synth.ts`. So a cluster workload reaches `ops` as well as a CI step — two of #18789's four criteria rather than one.

`ops` is not its own package. It is `packages/shared/cli/src/ops`, reached through `node_modules/.bin/ops` symlinked to `@shared/cli/src/ops/cli.ts`. Two verbs out of many are the ones the cluster reaches, so the boundary as it stands falls inside a package and inside a command.

Alan's reading on being shown this, 2026-08-11: he will work it out with `athena-manager` as part of the agent-harness migration, and his guess is that the part of `ops` running in CI is moved out of `ops`. A guess rather than a ruling, which is why this stands.

Not established: whether any third site reaches `ops`. Two were traced and no sweep was run.
