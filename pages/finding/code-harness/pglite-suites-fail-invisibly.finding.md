---
id: e0c92cc1-3927-54e4-980d-6ff53ee9514c
slug: pglite-suites-fail-invisibly
page-type-slug: finding
title: "Pglite suites fail invisibly"
domain-slug: domain/global
---

# Claim

`packages/alanwalton/projects/cli` carries 38 test failures (pglite / database-harness suites) on a clean `origin/main`, invisible in CI because the merge-queue gate does not run these locally-failing suites.

# Evidence

Filed as project #16159, domain `code-harness`, status `someday_maybe`. Surfaced while verifying #16032 (esoLiveDir OneDrive probe); unrelated to that change — measured on a clean `origin/main`, not inferred.

**Finding.** `packages/alanwalton/projects/cli` carries 38 test failures on a clean `origin/main` (pglite/database-harness suites), invisible in CI: the merge-queue gate (pipeline 25801, 114/114 steps, 0 nonzero exits) is green on the same SHA because CI doesn't run these locally-failing suites.

**Measurement.** Ran the suite twice — #16032 feature branch, and an ephemeral worktree cut from `origin/main` (`git worktree add /tmp/check-16032 origin/main`): branch 36 failures, clean origin/main 38 failures, both 1833 tests/243 files. Failing-suite diff was left-only (branch introduced none). The one delta (`runImportSales`) passes 4/4 in isolation on both trees — order/harness-dependent, not a regression.

**Why worth a project.** A test that always fails locally trains agents to treat red as noise — the mechanism by which a genuine failure gets scrolled past. It also makes "measure pre-existing failures before blaming your branch" expensive for every future implementer. The isolation-pass result points at shared state/ordering rather than 38 independently broken tests — root cause plausibly one harness defect.

**Suggested shape, undecided:**
1. Fix the local harness so suites pass locally, then wire into CI — closes the gap where 38 assertions guard nothing.
2. If they can't pass locally by design (real Postgres required, pglite gap), make that explicit and loud — skip with a stated reason.

Root-cause the ordering dependency first; the count may collapse.
