import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theBigBangTheorySeason5 = {
  id: "01a06802-b8be-703c-b769-3d7b643ef74e",
  type: "page-type/season",
  slug: "the-big-bang-theory-season-5",
  title: "The Big Bang Theory Season 5",
  partOfCollections: ["show/the-big-bang-theory"],
  position: 5,
  ownLength: 493.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2011-09-23",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4084",
      externalLink: "https://trakt.tv/shows/the-big-bang-theory/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
