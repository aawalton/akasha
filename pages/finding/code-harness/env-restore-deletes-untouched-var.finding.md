---
id: 4feb11be-65df-525d-a76a-9a1cd102638e
slug: env-restore-deletes-untouched-var
page-type-slug: finding
title: "Env restore deletes untouched var"
domain-slug: domain/global
---

# Claim

A test-file pattern exists where an env var is overridden in some tests, saved beforehand, and "restored" in an afterEach/afterAll that runs for every test — a restore written as `if (saved === undefined) delete process.env.X` cannot distinguish "saved and genuinely unset" from "never saved," so the hook can delete a variable it never touched, and because bun runs a shard in one process, the deletion escapes the file and silently disables later suites in the shard.

# Evidence

Filed as project #16171, domain `code-harness`, status `someday_maybe`. Root-caused by #16021's worker; this row is the class, not the single instance.

**Problem.** A test file overrides an env var, saves the prior value, restores it in an afterEach/afterAll that runs for every test. On tests that never overrode it, the saved value is undefined too — `if (saved === undefined) delete process.env.X` can't tell "saved and genuinely unset" from "never saved." Both read undefined, so the hook deletes a variable it never touched. bun runs a shard in one process, `process.env` is process-global, so the deletion escapes the file and silently disables later suites.

**Observed instance.** `packages/agents/supervisor/src/supervisor-tab-name.cli.test.ts` deleted `process.env.HOME` process-globally this way; its subprocess test never overrides HOME, so afterEach took the delete branch. Every later suite in the shard ran with no HOME; `knowledge.cli` died before registering (ZodError outside any test). bun tallies a pre-registration throw as 1 error + 1 fail with no `(fail)` line, silently eating all 9 of its tests. Fixed with an `overrodeHome` boolean (`supervisor-tab-name.cli.test.ts:73-87`) plus a last-running guard at :167. Landed in #16021 (1f6ff789).

**Measured surface:** 23 tracked .test.ts files call `delete process.env.<KEY>`; 16 also declare an afterEach/afterAll (the dangerous shape), none checked.

**Why a check, not doctrine:** lives in tracked files with a syntactic signature — an afterEach/afterAll branching on undefined with `delete process.env.*`, no separate override-happened boolean. Preferred fix: a `withEnv(key, value, fn)` helper owning save-and-restore as one scope, so the check becomes "no direct `delete process.env` in test files."

**Class relation:** `saved === undefined` is exactly as true in two different world-states, carrying zero bits — same shape as reading `status` as occupancy.

**Related:** #16021 (fixed instance); #16170 (sibling, slow-suite attribution); #16022 (this row causes that symptom class).
