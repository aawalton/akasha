---
id: 2d3194e4-4290-5613-bcca-d1fcf442e0a6
slug: curing-sibling-never-derived
page-type-slug: finding
title: "Curing sibling never derived"
domain-slug: domain/alanwalton-app
---

# Claim

Three docblocks in `packages/alanwalton/projects/cli` give, as half the reason the recent main-pipeline window is loaded unfiltered by status, a derivation the package declined to build: "find the immediate newer sibling that cured a `resolved` covering pipeline". Nothing derives it. `resolveMainVerdictCoverage` returns `{ covering }` alone, and `build-ci-cure-record.ts` states that the record "DOES NOT NAME A CURING PIPELINE", giving three reasons for not deriving one.

# Evidence

Read at `origin/main` `13135651993c19af09ce41b6295264191071d3c1`.

`src/lib/main-verdict-coverage.ts:17-23` — the module docblock: the status filter "is NOT applied at the query anymore (#15162): the shell needs the full recent list to both (a) filter green-equivalent candidates … and (b) find the immediate newer sibling that cured a `resolved` covering pipeline for the recorded evidence."

`main-verdict-coverage.ts:88-95` — `loadRecentMainPipelines`' own docblock repeats it: the pure layer "separately uses the full list to find the newer sibling that cured a `resolved` covering pipeline."

`src/pure/decide-main-verdict-coverage.ts:66-68`, on `RecentMainPipeline`, is a third site: "the shell loads these unfiltered so this pure layer can both filter green-equivalent candidates and find the immediate newer sibling that cured a resolved covering pipeline."

Nothing derives the sibling. `resolveMainVerdictCoverage` (`main-verdict-coverage.ts:162-184`) calls `findCoveringMainVerdict` over `filterGreenEquivalentCandidates(recentMainPipelines)` and returns `{ covering }`. It is `loadRecentMainPipelines`' one production caller; every other reference is the database test.

The module that would consume it says why it does not. `src/pure/build-ci-cure-record.ts:18-25` — "IT DOES NOT NAME A CURING PIPELINE. … Naming the individual curer would mean re-deriving per-workflow witness identity here: the resolver computes it transiently and keeps nothing, this call path loads pipeline rows without their workflows, and the witness query aggregates `MAX(seq)` to answer *whether* a cure exists rather than `MIN` to answer *which*." `build-ci-cure-record.unit.test.ts:29-34` pins it, asserting `parseCiCure({ …, curedBy: 99 })` is null.

Only arm (a) remains true of the unfiltered load.

Filed while ingesting `dirty/questions/code-repo-source-comment-reach.md`, whose first entry recorded this and was cut as not instruction. It named the consumer `build-cure-evidence-note.ts`, since replaced by `build-ci-cure-record.ts` carrying the same reasons.
