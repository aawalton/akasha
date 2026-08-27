---
id: 9b592b98-a024-506c-91fa-a656f11ff634
slug: census-drops-a-population-without-a-figure
page-type-slug: finding
title: "Census drops a population without a figure"
domain-slug: domain/instrument
---

# Claim

`summarizeHaltCensus` drops every turn-end with no known spawn time, and `HaltCensus` carries no figure for them, so a consumer summing the arms gets a total with a silent subtraction and an absent figure reads as nothing-was-dropped. Every other excluded population in the same fold carries a figure.

# Evidence

Read on main 2026-08-07, in `packages/agents/cli/src/agent/`.

`halt-census-summary.ts:111` opens `summarizeHaltCensus` with `const placed = turnEnds.filter((t) => t.spawnedAtMs !== null)` and folds only `placed` into its two arms. `interface HaltCensus` at :64 holds `before`, `after`, `verdict` and `halts`, and no member for the dropped population. So `before.turnEnds + after.turnEnds + before.refused + after.refused` is the number of PLACED stops, and nothing in the value says whether that equals what the caller passed in.

The contrast inside the same fold is what makes it a defect rather than a choice. A refused stop is also excluded — `fold` at :79 splits `refused` out of `turnEnds` — and it is counted in `refused` on both arm variants, including `no-evidence`, so a reader can always account for it.

The docstring at :107 answers where the missing count lives with a fact about a different object: "It is counted in neither arm; the gather reports how many were dropped." The gather does, at `halt-census-gather.ts:390` (`seatsUnplaced`) and `:394` (`unplacedInvocations`). A consumer holding a `HaltCensus` and no access to the gather has no route to either.

`Population` on `domains/instrument.md` is what this contradicts: state the population size where an instrument reports.

One thing has moved since this was first observed on 2026-07-29, when the property test's generator always supplied an integer `spawnedAtMs` and no draw could produce an unplaced stop. `halt-census-core.property.test.ts:162` now computes `const unplaced = turnEnds.filter((t) => t.spawnedAtMs === null).length` and asserts `armTotal(before) + armTotal(after) + unplaced === turnEnds.length`. The conservation is pinned in the test while the returned value still cannot express it.

Carried out of a quarantined document queued for removal, and re-read against the source rather than copied. It was left unfixed at the time on the domain lead's ruling that the fold's return type is a design question rather than a repair.
