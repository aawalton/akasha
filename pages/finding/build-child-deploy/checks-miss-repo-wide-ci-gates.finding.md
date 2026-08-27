---
id: 4666f80b-1eca-503c-9dcd-b4dfee0e7902
page-type-slug: finding
title: "Checks miss repo wide CI gates"
domain-slug: domain/global
---

# Claim

A child running `build-child-deploy` can run every instrument its `checks` stage names, pass all of them, and still fail branch CI — because that stage names per-package instruments while branch CI additionally runs repo-wide convention gates that nothing in the child's stage reaches. The child reports green honestly and the manager discovers the failure one stage later, after the seat has stopped.

# Evidence

Two witnesses, both on #18614 under #18611, 2026-08-11, from different seats and disjoint gates.

At `f99495b43d` the child ran the three instruments its stage names — per-package `typecheck`, `ops lint-verdict` over 360 files, `ops tests run` at 1442 unit and 35 database — and reported green; its manager independently re-ran 563 tests in `personas/core` and agreed. Branch CI then failed 3 steps of 120: `check-ast-unused` over 10,525 modules, `check-tsconfig` over 393 workspaces, `check-syntax-bundle` over the touched files.

At `d801c73825` a later seat ran the same instruments across the packages that CONSUME its change rather than only the one it edited — a wider reading of the stage — at 0 lint errors over 104, 48, 3 and 109 files and 907 tests. Branch CI failed 2 steps of 99: `check-file-length` over 14,133 files (`faucet-apply.ts` at 549 against a cap of 500) and `check-syntax-bundle` (`: void` where the repo has standardised on `: undefined`).

All five were confirmed to originate in the tree's own commits rather than in `main`, by diffing against base: `faucet-apply.ts` measures 490 lines on `origin/main`, which carries no `: void` in `health-total-points.ts`.

No two of the five are the same gate, and the second witness shows that widening the stage's per-package reach does not close the gap. What differs is the population, not the diligence: each failing gate scores a repo-wide denominator while every instrument the stage names is scoped to the touched packages. A seat cannot reach a repo-wide denominator by being more careful about a per-package one.

The gates run from a worktree and take no arguments, so the gap is one of naming rather than of reach: `bun packages/infra/checks/src/checks/check-tsconfig.ts`, and the same for the others. Verified present at that path.

The cost falls on the manager: `ops project check` is the manager's act, so the failure surfaces after the child has stopped. Second time round it cost two CI cycles on a tree another project was blocked on, and a respawned seat.
