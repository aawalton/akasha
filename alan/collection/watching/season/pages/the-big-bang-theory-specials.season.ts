import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theBigBangTheorySpecials = {
  id: "01a06802-b8bf-7002-8277-97ebddbb1efd",
  type: "page-type/season",
  slug: "the-big-bang-theory-specials",
  title: "The Big Bang Theory Specials",
  partOfCollections: ["show/the-big-bang-theory"],
  position: 0,
  ownLength: 66,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2012-04-06",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4079",
      externalLink: "https://trakt.tv/shows/the-big-bang-theory/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
