import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const onePieceSeason3 = {
  id: "01a06802-b8bc-7000-aaff-49933be74204",
  type: "page-type/season",
  slug: "one-piece-season-3",
  title: "One Piece Season 3",
  partOfCollections: ["fandom/one-piece"],
  position: 3,
  ownLength: 336,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2001-08-26",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/one-piece/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
