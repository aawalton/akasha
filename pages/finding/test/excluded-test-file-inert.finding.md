---
id: b4e36408-43fe-5a82-bf6f-87f1a36cde67
slug: excluded-test-file-inert
page-type-slug: finding
title: "Excluded test file inert"
domain-slug: domain/test
---

# Claim

A type-rung demonstration placed in a test file inside a package whose tsconfig excludes test files is never compiled and so cannot fail, yet nothing records which packages are on which side of that line, so an author cannot tell whether their type-rung demonstration is live or inert.

# Evidence

Project #17178 (status someday_maybe, live-on deploy, domain `test`); notes captured 2026-08-15, no objective written.

Found by `worker-16961` correcting a claim its own brief quoted. `estate-trees.ts` says its reachability record is caught at the `type` rung. `cohort.unit.test.ts` says it sits at `test`, not `type`, since `packages/infra/checks/tsconfig.json` excludes `**/*.test.ts`, so no test in that package is ever compiled. A third surface, `estate-tree-coverage.md`, agreed and called it measured. The disagreement produced no error.

Why worse than a stale sentence: Both-Verdict Reachability ranks demonstrations type/test/editorial, `type` strongest — a construction that fails to compile is evidence nothing can argue with. Where tsconfig excludes test files, that evidence doesn't exist: a test demonstrating a typecheck failure is never typechecked, so it passes by never being asked. The suite stays green; only the type-level half is inert.

Population: first measured at 86 of 421 `tsconfig.json` files under `packages/` containing the literal `"**/*.test.ts"`, only `packages/infra/checks/tsconfig.json` confirmed under `exclude` (others matched the string without verified position, so true figure was at most 86, at least 1). Remeasured by #16925's manager (2026-07-29): 140 of 421 workspace tsconfigs exclude test files — a third of the estate.

Remedy is not a sweep: auditing found packages leaves the rest unmarked. Wanted: a type-rung claim cannot be made from a file the compiler never reads. Consequence: an amended criterion on #16961 demanded a type-rung demonstration, and its worker independently moved it into production code (`estateTreeRoots()`'s `Record<EstateTree, …>`) rather than a test — reached by reading the tsconfig, not by any mechanism telling it. Related to #17246: Both-Verdict Reachability already names the `type` rung's precondition; nothing enforces it.
