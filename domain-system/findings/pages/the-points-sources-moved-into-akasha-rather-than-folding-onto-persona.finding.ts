import type { Finding } from "../finding.page-type.ts"

export const thePointsSourcesMovedIntoAkashaRatherThanFoldingOntoPersona = {
  id: "01a060cb-8de2-7000-8eb8-d860b4ebe830",
  pageTypeSlug: "finding",
  domainSlug: "domain/alan-harness",
  slug: "the-points-sources-moved-into-akasha-rather-than-folding-onto-persona",
  claim:
    "The 24 persona points sources moved into akasha as a page type of their own rather than folding their six fields onto the migrated `persona`. Folding had no home for what a source carries beyond those six, and would have written into 24 persona pages that four other writers also write. Moving is additive: nothing else writes the new folder. The rows the points tier builds hash the same across the change, so `askComposed` could leave `persona-recipe-rows.ts` with no figure moving.",
  evidence:
    "`pages/persona-points-source/` held 24 pages: kind on 24, marker on 9, aggregate on 3, point-field on 1, weight-field on 1, path-prefix on 0, readings on 3. Twenty-two of the 24 Design sections restate the persona's own green-day bar and none differs from it, so those were dropped as duplication and the four saying something else became invariants. Each id is a uuid version 7 keeping the last eight hex of the version 5 id it replaces.\n\nAgainst folding onto `persona`: that page type has no home for a per-source definition, for the readings three sources name, or for the four design statements, and `totals`, `engine-total-points`, `health-total-points` and `session-points-totals` all write persona pages, so editing 24 of them races four writers. The new folder is written by nothing else.\n\nLanded at `c5a3257e3a` and `ac84e4f7e5`. The service refused `persona-points-source` by name before. Between the two commits it held the name and answered 0 rows against 24 pages on disk — the empty-but-green shape a bare declaration makes. After the second it answers 24.\n\nProved in a reflink copy served by its own store on 8788, so no read or write reached the live tree. `personaRecipeRows()` answers 42 rows hashing 6d6417b6cf7efb9c02918698ef2c0dc196cfcf4bd8b0353d71688ff9ee28979f by either road, 13 parsing to a recipe: external 9, windowed 3, stoplights 1. The recompute then reaches `readouts/daily-stoplights.ts:12`, which asks the removed saved query `value-all`, and exits 3 there by either road.",
} as const satisfies Finding
