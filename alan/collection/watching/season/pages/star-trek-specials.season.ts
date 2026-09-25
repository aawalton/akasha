import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekSpecials = {
  id: "01a06802-b8bd-7014-ad44-d9de6301442c",
  type: "page-type/season",
  slug: "star-trek-specials",
  title: "Star Trek Specials",
  partOfCollections: ["show/star-trek-2"],
  position: 0,
  ownLength: 1461,
  ownProgress: 1461,
  unit: "unit/minutes",
  status: "archived",
  grade: "B",
  publishedAt: "1988-10-16",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-922",
      externalLink: "https://trakt.tv/shows/star-trek/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
