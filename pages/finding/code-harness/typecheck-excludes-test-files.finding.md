---
id: a09207e0-57df-5269-887d-e351906080bb
slug: typecheck-excludes-test-files
page-type-slug: finding
title: "Typecheck excludes test files"
domain-slug: domain/global
---

# Claim

Package tsconfigs exclude `**/*.test.ts`, so `bun run typecheck` returns clean while type errors in test files go undetected — including a confirmed pre-existing NodeCapacity literal missing both capacity fields in select-next-unpinned.unit.test.ts that nothing catches today.

# Evidence

Found by worker-16243 during #16243, which trusted `bun run typecheck` to enumerate construction sites and had it silently miss six files.

Defect: package tsconfigs exclude `**/*.test.ts`, so typecheck cannot see type errors in test files, returning clean while they exist. Confirmed pre-existing instance, left alone as out of scope by the finder: a NodeCapacity literal missing both capacity fields in select-next-unpinned.unit.test.ts, uncaught today.

Types are the first, cheapest rung of the Reliability ladder; here the rung is absent for a whole category of source — "typecheck clean" is true only of the files tsconfig chose to look at, invisible in the verdict. Same shape as #16290 (a fizz proof sound over an incomplete domain): true of what?

Second-order cost, and how it was found: an agent enumerating sites via typecheck gets a silently incomplete answer — worker-16243 missed six files this way. Any refactor relying on "change the type, follow the errors" is unsound for test code in this repo, since the errors never surface.

Not yet verified: whether a separate test-typecheck path exists (distinct tsconfig, CI step, editor-only) not wired into `bun run typecheck` — the finder reported from direct experience, not a survey.

Candidates, not decided: (a) include test files in the typecheck graph, expect a pre-existing-error backlog; (b) a dedicated test-typecheck project reference, keeping test errors out of the production build graph; (c) make the verdict honest about what it excluded, regardless of (a)/(b) — the generalising member, an aggregate verdict hiding its own scope.

Same evening, same class of instruments reporting success while measuring nothing: #16290, #16291, #16292, #16293, #16296, #16298 (the class row), #16278's dark 0.7%-coverage timings object — this is the eighth.

Project #16302, someday_maybe, domain code-harness. Captured, never formally defined; moved here off the row's retired `notes` attribute on 2026-08-15.
