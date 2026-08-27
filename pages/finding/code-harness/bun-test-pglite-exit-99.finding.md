---
id: b611f80a-6ecc-5316-8e58-ce593ad6968a
page-type-slug: finding
title: "Bun test pglite exit 99"
domain-slug: domain/global
---

# Claim

`bun test` exits 99 on an all-pass run whenever the invoked test file (or any file swept into a directory-level run) imports PGlite, while the summary line still reports the true pass/fail count. CI aggregates on reported counts and stays green, but local pre-land verification reads the exit code and sees a fabricated defect on correct code; the cause (PGlite teardown leaving a nonzero process exit is the working hypothesis) is not yet established.

# Evidence

Project #16343 (domain: code-harness, status: someday_maybe, live-on: deploy). No initiative named.

Measured with a firing control: `bun test ./packages/agents/shared/list-helper-specs.database.test.ts` (imports PGlite) reports "2 pass / 0 fail / 10 expect() calls" but exits 99. A non-PGlite control (`./packages/shared/cli/src/ops/work-halt-gate.unit.test.ts`) reports "3 tests / 0 fail" and exits 0. #16258 observed the same on three further untouched files (`db-agent-mutations`, `oauth-db`, `db-action-messages`). Roughly 20 files carry the PGlite import.

Why it matters: the summary line tells the truth and the exit code lies. CI aggregates on reported counts so main stays green; the defect fires on local pre-land verification, where an agent reads `$?`. A passing suite reads as red, prompting debugging of correct code — #16258 nearly filed its own suite as a defect on this. Also a silent hazard for any script gating on the exit status.

Scope: establish the cause (PGlite teardown leaving a nonzero exit, hypothesis not yet verified), then fix the teardown or make the exit reflect the result. Do not teach agents to ignore the exit code.

Additional packages, from #16374's pre-land verification (worker-16374, untouched-package controls): all exit 99 on 0 fail — `packages/infra/ci/orchestrator/src/ci-pod-dispatcher/*.database.test.ts` (7 files), `.../worker/src/reactors/apply-create-uniqueness.database.test.ts`, `.../devops-monitor/src/snapshot.database.test.ts`.

Survives aggregation: a whole-directory run inherits the 99 from any PGlite file in it — the ci-pod-dispatcher directory reports "298 pass / 0 fail / 43,798 expect() calls" but exits 99, while a single non-PGlite file there exits 0. So the false red contaminates any per-directory run, the shape an agent runs before landing.

Confirmed CI stays green on the same commits: pipeline 26114 @ 025c8c7 ran these suites and terminalized 90/90 steps, zero non-green, the same hour as the local exit-99 readings.
