---
id: 40179b22-5341-5fda-b411-d9e00243f787
page-type-slug: finding
title: "Source filled while the persona earned nothing"
domain-slug: domain/persona-points
---

# Claim

Two personas whose points-source documents name a store that filled inside their own window have never earned a point from it, and their zero reads the same as a persona who genuinely did nothing.

# Evidence

Measured 2026-08-19 against the live database, over the 1,933 live `relationship-progress` rows, while defining #19434.

Five personas have never earned a point: ceri (52 days), elin (46), erin (52), zadi (52), zeli (51). Every fraction on every one is zero and all five carry `totalPoints` zero.

Two of their stores filled inside that window. **Erin** counts ten a game, ten a review session and one a puzzle against a bar of eight; `chess-game` holds 22 rows from 2026-07-01 and 07-02 and `chess-puzzle` holds 5,000 from 06-27. **Zadi** counts Great Books words at 5,000 for a green day; `gbww-reading` holds 212 rows, newest 06-28.

**Their writers run.** All 52 of Erin's days carry a `sourceTotalSnapshot` and 43 of Zadi's do — a key only `writePersonaDayPointsFromTotal` writes. The largest value either has ever held is zero, so what fails is upstream: the running total handed to the writer is zero while the store it counts holds thousands. A worker that never ran leaves the key absent, which is what elin and zeli show — neither has one on any day.

The delta ledger is where to look first. `computePointsSourceDelta` returns zero whenever the prior snapshot is undefined, and `priorSourceSnapshot` reads the single most recent prior row and takes undefined when that one carries no snapshot rather than looking further back.

Two of the five zeros are accurate: **ceri** counts anime minutes and `anime-episode` holds no rows ever; **elin** counts collections projects and the newest `collection` row is 2026-04-19, before her first day.

Not measured: what the aggregate behind each marker counts, or whether `chess-practice-points` and `gbww-chapter-completions` resolve to the page types named here. `ops persona points-source check` has exited 70 on a deleted package since 2026-08-19 and reports nothing.
