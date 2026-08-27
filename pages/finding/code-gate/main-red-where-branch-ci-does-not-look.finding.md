---
id: 5595bdc6-c0ef-5ee9-a93d-e0857ade80aa
slug: main-red-where-branch-ci-does-not-look
page-type-slug: finding
title: "Main red where branch CI does not look"
domain-slug: domain/global
---

# Claim

Main carries failing tests, and at least one of them is not run by branch CI — so a project inherits red it did not cause, could not have been warned about, and has to disprove authorship of before it can proceed.

# Evidence

Two instances reached one lead on 2026-08-06, from two unrelated projects, neither of which touched the code that failed.

`packages/shared/cli/src/ops/cli.cli.test.ts`, "a synthesized prose route on a sibling verb is in the cohort", reported failing on main by the seat delivering #17955, which recorded that branch CI does not run it. Reproduced by the lead at 33 tests, 32 pass, 1 fail, on a checkout of main.

`packages/alanwalton/projects/cli`, `runRuling — a failed row write sends nothing`, reported failing identically on branch and on main by the seat delivering #17952, and filed separately as `pages/finding/project/run-ruling-fails-on-main.finding.md`.

What makes the pair worth one finding rather than two: a failure present on both sides of a branch is invisible to every instrument that compares them, so the cost is paid once per seat that meets it rather than once. A green branch verdict is what a delivering seat is told to trust, and it is silent about exactly this.
