---
id: d2d82071-0740-54a3-994d-10aa05b19abf
slug: orphan-audit-misses-instructions-repo
page-type-slug: finding
title: "Orphan audit misses instructions repo"
domain-slug: domain/global
---

# Claim

The daily orphaned-resources sweep fails on every run, because its job clones only the code repository while the `ops` dispatcher it calls now stands in the instructions repository. The audit exits before reading anything, and the sweep reports zero orphans across zero namespaces rather than failing quietly. The sibling slow-suite sweep already clones both repositories and sets `INSTRUCTIONS_ROOT`, so the shape the repair needs stands beside it.

# Evidence

Read 2026-08-16. CronJob `ci/orphaned-resources-sweep` runs `41 8 * * *`. Its status gives `lastScheduleTime` 2026-08-15T08:41:00Z against `lastSuccessfulTime` 2026-08-12T08:41:20Z. Job `orphaned-resources-sweep-29779721` carries `Failed` with `reason=BackoffLimitExceeded`, `failed=1`, started 08:41:00Z and failed 08:41:16Z; `backoffLimit` is 0, so one attempt is all it gets.

The job's own log, from Loki, gives the cause:

```
[orphaned-resources-sweep-notify] fatal: orphan audit could not run — audit
exited 1 with no parseable --json result (JSON Parse error: Unexpected EOF);
stderr: error: Cannot find module '/work/instructions/tools/ops/cli.ts' from
'/work/code/packages/shared/cli/src/ops/forward.ts'
```

The line above it reads `audit ranOk=false; 0 orphan(s); 0 live resource(s) across 0 app namespace(s)`, so the zero is an audit that never ran rather than a clean sweep.

`packages/infra/ci/orphaned-resources-sweep/k8s/synth.ts:38-54` holds the whole script. Line 41 clones one repository, `git clone --depth 1 ... /work/code`, and nothing clones the instructions repository. Line 53 execs the runner, and `src/run-orphan-sweep-and-notify.ts:35` spawns `["bun", "ops", "k8s", "orphaned-resources", "--json"]`.

`packages/infra/ci/slow-suite-sweep/k8s/synth.ts:51-54` clones three repositories through a `cloneCmd` helper, including `cloneCmd("instructions", "/work/instructions", true)`, and line 99 sets `INSTRUCTIONS_ROOT` to `/work/instructions` in the container env. That job completed successfully 17 hours before this reading.

The blast radius is this job alone: across every runner under `packages/infra/ci/*/src/`, `run-orphan-sweep-and-notify.ts:35` is the only site spawning `ops`.

Both `JobFailed` and `CronJobStale` fired on this one subject.

Not established: whether orphaned resources have accumulated over the days the sweep has been blind. Nor why no failed job object survives from 08-13 or 08-14, `failedJobsHistoryLimit` being 3 and only one standing.
