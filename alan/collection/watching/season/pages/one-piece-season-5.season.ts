import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const onePieceSeason5 = {
  id: "01a06802-b8bc-7002-a770-fbe15f7fd494",
  type: "page-type/season",
  slug: "one-piece-season-5",
  title: "One Piece Season 5",
  partOfCollections: ["fandom/one-piece"],
  position: 5,
  ownLength: 312,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2002-11-03",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/one-piece/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
