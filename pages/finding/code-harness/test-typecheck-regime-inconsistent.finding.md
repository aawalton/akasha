---
id: 35f78514-dcfb-5edd-bda1-4a437c11141d
page-type-slug: finding
title: "Test typecheck regime inconsistent"
domain-slug: domain/global
---

# Claim

Whether a test file is type-checked in this repo depends on which package it lives in and nothing announces the regime, so a fixture can hold a type error indefinitely while its suite passes for the wrong reason; measured 2026-07-25, 141 of 415 package `tsconfig.json` files exclude test files from typechecking.

# Evidence

From project #16207 (`code-harness`, `someday_maybe`, `live-on: deploy`), no objective — captured 2026-07-25T15:09:27Z, moved from retired `notes` 2026-08-15.

Instance that surfaced it (worker-16195, 2026-07-25): the gate-closed fixture in `packages/infra/ci/orchestrator` built a `NodeCapacity` missing its two required ceiling fields. `bun test` does not typecheck, and that package's tsconfig excludes test files, so nothing read the omission until the fractional-ranking change read the field, `Math.max(undefined, 1)` produced `NaN`, and six tests failed with zero admissions. Sharp form: an untyped fixture passes by not exercising the field that is missing.

Measured, 2026-07-25: `tsconfig.json` under `packages/`: 415. Excluding `**/*.test.ts` (untypechecked): 141. With a dedicated `tsconfig.test.json` (typechecked): 2 — `packages/shared/design/layout`, `packages/shared/pages/ui`. Remainder, typechecked inline via `src/**/*.ts`: ~272.
Inconsistent, not repo-wide: the same fixture is type-checked in `packages/agents/cli`, unchecked in the orchestrator; only reading a package's tsconfig tells which regime applies.

The fix pattern exists in-repo (`tsconfig.test.json`, 2 uses); 141 instances is past the Rule of Three, so the project judges a check enforcing one regime warranted.

Direction carried: (1) decide one regime — tests in the main graph, or every package gets `tsconfig.test.json` — preferring whichever keeps `tsc -b` wall-clock acceptable, measured not assumed; (2) add a check so a new package can't opt out silently; (3) migrate the 141 packages, expecting latent fixture type errors like the orchestrator's. Acceptance proposed: reintroduce the orchestrator omission on a branch, confirm the gate rejects it pre-test, then confirm the check rejects a new opted-out package.

Bound: the 141/272 split is a tsconfig count, not affected-test-file count — how many of the 141 packages contain tests was not measured. 141 is a ceiling, not a measurement.
