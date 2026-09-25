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
} as const satisfies Fandom
