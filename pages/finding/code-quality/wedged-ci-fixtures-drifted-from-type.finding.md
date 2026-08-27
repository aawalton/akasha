---
id: 65e228db-e2ba-50da-93ec-ac76c31c4c61
slug: wedged-ci-fixtures-drifted-from-type
page-type-slug: finding
title: "Wedged CI fixtures drifted from type"
domain-slug: domain/code-quality
---

# Claim

Five `.unit.test.ts` files in `packages/alanwalton/stale-project-detector/src/` annotate a fixture `const GENUINE_WEDGE: WedgedCiState` with a property the type has not carried since `29479901eb`, and all five omit a property it requires. `tsc` would refuse every one; none is compiled, because the package tsconfig excludes `**/*.test.ts`. The suites still run and pass under `bun test`, which strips types without checking them.

# Evidence

Measured 2026-08-08 in `~/code` while running `ingest-instructions` over `dirty/code/packages-alanwalton-stale-project-detector-docs-wedged-ci-suppression.md`.

THE TYPE HAS TWO FIELDS. `src/wedged-ci-state.ts:21-31` declares `WedgedCiState` as exactly `latestPipelineTerminal: boolean` and `latestPipelineRunning: boolean` — read off the type, not a comment.

THE FIXTURES CARRY A THIRD AND MISS A SECOND. All five annotate `: WedgedCiState` — `decide.unit.test.ts:26`, `durable-dedup.unit.test.ts:10`, `decide-suppression.unit.test.ts:16`, `decide-capacity.unit.test.ts:14`, `decide-liveness.unit.test.ts:12`. Every one sets `verdictNotePresent`, absent from the type; none sets `latestPipelineRunning`, which it requires; the first two also set `mergeQueueEntry`.

BOTH ERRORS VERIFIED, not inferred — a scratch file outside `~/code` reproducing the live type and the `decide.unit.test.ts` literal verbatim. `bunx tsc --noEmit --strict` gives TS2353 on `verdictNotePresent`; with the excess stripped, TS2741 on the missing `latestPipelineRunning`.

WHY NOTHING REPORTS IT. The package `tsconfig.json` carries `"**/*.test.ts"` in its `exclude`, so no test file enters the program `tsc -b` builds.

THE COMMIT THAT LEFT THEM. `29479901eb` retired the deploy-in-flight angle. `git show --stat` shows it removed exactly one line — `mergeQueueEntry` — from three of the fixtures, leaving `verdictNotePresent`, and never touched the other two.

NO DIVERGENCE TODAY. `decide.ts:211` returns `ci.latestPipelineTerminal || ci.latestPipelineRunning`; the second operand is `undefined` here, which is falsy. The hole is the contract: these suites never bind `latestPipelineRunning`, so a change to its polarity or name passes them green.

WHAT THIS ADDS. A code-check finding recorded the mechanism — that nothing constrains a workspace tsconfig's `exclude` — and closed by naming as unmeasured how many type errors stand in the excluded population. This is a measured instance, in a named package.

Not measured: whether other excluded workspaces carry the same drift.
