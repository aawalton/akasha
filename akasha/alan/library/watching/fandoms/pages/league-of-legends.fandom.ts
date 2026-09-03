import type { Fandom } from "../fandom.page-type.ts"

export const leagueOfLegends = {
  id: "01a06808-5078-7001-ab79-3488005b413a",
  pageTypeSlug: "fandom",
  slug: "league-of-legends",
  title: "League of Legends",
  partOfSlugs: ["fantasy-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Fandom
