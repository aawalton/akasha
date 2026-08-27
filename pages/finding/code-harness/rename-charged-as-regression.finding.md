---
id: a083eada-ec7e-5099-b6df-83dcb59f35af
slug: rename-charged-as-regression
page-type-slug: finding
title: "Rename charged as regression"
domain-slug: domain/global
---

# Claim

The slow-suite gate matches a base-side failure to a branch-side one on `file` plus the test's own NAME, so any branch that renames a test inherits every failure standing in it as its own. The gate's stated forgiveness — "a red run whose every failure reproduces on the base side is a `pass`" — is unreachable for the one class of change that renames tests, and that class is a Ubiquitous Naming rename, which the global principle asks for by name.

# Evidence

`packages/infra/tests/src/attribute-slow-suite-failures.ts:226` builds the match key from `failure.file` and `failure.name` joined by a NUL, and line 362 admits a branch failure to `preExisting` only where that exact key is present in the base-side set. `FailureIdentity.name` is the test's full name text.

Project #18136 renamed `cohort` to `population` across 392 files, `packages/shared/cli/src/ops/cli.cli.test.ts` among them. `git diff origin/main...origin/project-18136` over that file shows `it("a synthesized prose route on a sibling verb is in the cohort")` become `... is in the population`. The suite's one failure was pre-existing — #18136 records it failing identically on unmodified `~/code` at `ecf5f951`, then `origin/main` — but the two sides keyed differently, the control could not excuse it, and `ops project check` refused to mint branch CI. #18136 stood at `checks` for a day over a failure it did not cause and the gate was built to forgive.

The module states the trade deliberately: "AMBIGUITY CHARGES THE BRANCH ... an unprovable match is not a match." That reasoning is sound for an unlocated failure, where `file` is null. It is doing something else here: the file IS located and identical on both sides, and only the name moved, so the gate had the evidence to match and declined on a key it chose.

The general shape: a rename project is exactly the change whose diff cone is widest, so it selects the most suites, so it meets the most standing reds — and it is the single change class for which the base-side control cannot clear any of them.
