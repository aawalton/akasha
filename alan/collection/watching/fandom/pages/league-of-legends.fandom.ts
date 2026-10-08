import type { Fandom } from "akasha/alan/collection/watching/fandom/fandom.page-type.types.ts"

export const leagueOfLegends = {
  id: "01a06808-5078-7001-ab79-3488005b413a",
  type: "page-type/fandom",
  slug: "league-of-legends",
  title: "League of Legends",
  partOfCollections: ["fandom-collection/fantasy-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:30.488Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Fandom
