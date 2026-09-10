import type { Season } from "../season.page-type.types.ts"

export const theBigBangTheorySpecials = {
  id: "01a06802-b8bf-7002-8277-97ebddbb1efd",
  pageTypeSlug: "season",
  type: "season",
  slug: "the-big-bang-theory-specials",
  title: "The Big Bang Theory Specials",
  partOfCollections: ["the-big-bang-theory"],
  position: 0,
  ownLength: 66,
  ownProgress: 0,
  unit: "minutes",
  status: "archived",
  publishedAt: "2012-04-06",
  externalId: "trakt-season-4079",
  externalLink: "https://trakt.tv/shows/the-big-bang-theory/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
