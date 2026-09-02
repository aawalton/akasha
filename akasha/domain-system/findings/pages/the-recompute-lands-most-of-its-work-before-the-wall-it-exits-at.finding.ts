import type { Finding } from "../finding.page-type.ts"

export const theRecomputeLandsMostOfItsWorkBeforeTheWallItExitsAt = {
  id: "01a05c31-f01d-71b1-99f3-f7aac04745fd",
  pageTypeSlug: "finding",
  slug: "the-recompute-lands-most-of-its-work-before-the-wall-it-exits-at",
  domainSlug: "domain/akasha-migration",
  claim:
    "The daily-tracking recompute has exited non-zero on every run since 2026-08-30, but it lands the fourteen day reading rollups, the points sources and the rescore before it reaches the persona engine total it dies on. Holding the timer off does not defer those writes, it drops them, and the persona-day writer reaches only yesterday and today, so a day skipped that way is not recoverable.",
  evidence:
    "The journal for daily-tracking-points.service shows its last clean Finished at 2026-08-30 12:08:24. Every run after exits 1, the wall moving forward as lanes landed through the night: at 09-01 00:06 `persona-all` went unanswered, `persona` names no page type whose pages are files; at 01:06 and 01:19 `no Health persona is titled Aelwyn`; and once the spelling was repaired, the persona engine total, already filed as a-persona-engine-total-cannot-land-because-nothing-renders-an-akasha-page-body. tools/lib/wake-day/run-commit-points.ts orders the work: fourteen days of strength, active calories, sleep, nutrition, tasks and breathing, then the points sources over offsets -1 and 0, then the rescore, and only after all of it the engine total. Observed across the firing of 09-01 02:57, each of those ran and its writes landed before the exit. The help on services/daily-tracking-points.ts states every rollup recomputes a day from that day's own window and overwrites, so a run repeated costs nothing and a run cut short leaves nothing half-written. POINTS_SOURCE_DAY_OFFSETS is [-1, 0], so a persona-day is written for two days only, and eppie has no page at all for 08-19 or for 08-22 to 08-24. What the wall withholds is the engine totals, the health totals and the three session ladders, which are derived and recomputed whole once a persona body can be rendered. What the stopped timer withholds is the day itself.",
} as const satisfies Finding
