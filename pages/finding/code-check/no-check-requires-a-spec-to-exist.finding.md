---
id: 62bc7ef7-91f3-5887-bb79-16330346b43f
page-type-slug: finding
title: "No check requires a spec to exist"
domain-slug: domain/global
---

# Claim

No check requires a formal model to EXIST for a newly-added pure decider: `check-fizz-subset` discovers pairs by walking `.fizz` files outward to their sources, so a decider with no spec is never enumerated, and `check-spec-bundle` runs only the specs already authored. Both report green over a decider that was never modelled.

# Evidence

Measured 2026-08-07 while ingesting `dirty/questions/merge-queue-doctrine.md`, which names the gap and has since been emptied and removed.

The direction of discovery is what makes the case unreachable. `packages/infra/checks/src/lib/fizz-spec-pairs.ts` states it: "For every `packages/<pkg-root>/spec/<name>.fizz` tracked under the repo root, computes the canonical TS-source path at `packages/<pkg-root>/src/pure/<name>.spec.ts` and reports whether it exists on disk." Enumeration starts at the `.fizz` artifact and looks outward for a source. It never walks `src/pure/*.spec.ts` looking for a missing model, so a decider with no `.fizz` is not a pair, is not a skipped pair, and is not in the cohort at all.

`check-fizz-subset.ts` confirms the asymmetry with what it does find: "Pairs whose TS source is absent are skipped." An unpaired ARTIFACT is skipped and reported as such; an unpaired SOURCE is invisible.

`check-spec-bundle.ts` does not close it — it "discovers every `*.fizz` spec under the three long-running-worker spec directories and parallel-runs them via `runFizz`", model-checking specs that exist. `ops spec check` is likewise "Model-check FizzBee specs (`*.fizz`) under a given path". These two are the only spec checks in `packages/infra/checks/src/checks/`.

Distinct from the four standing findings on these checks. `spec-bundle-population-partial.md`, `fizz-subset-selected-on-changed-files.md`, `fizz-subset-noop-comment-stale.md` and `fizz-subset-header-claims-empty-cohort.md` all concern specs that EXIST and are not reached, or docblock claims about them. This is about one never written, which no widening of `SPEC_DIRS` or of dispatch would surface.

Not measured: whether any decider currently lacks a spec, how many `src/pure/*.spec.ts` stand unpaired, and whether requiring authoring is wanted — the obligation is stated in coordinator spec documents now quarantined under `dirty/code/`, which I did not weigh. I read the two checks, the pair-discovery lib and the `ops spec` help; I ran neither check.
