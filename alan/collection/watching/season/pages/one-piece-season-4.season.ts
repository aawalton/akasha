import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const onePieceSeason4 = {
  id: "01a06802-b8bc-7001-b57b-3029d0cbb520",
  type: "page-type/season",
  slug: "one-piece-season-4",
  title: "One Piece Season 4",
  partOfCollections: ["fandom/one-piece"],
  position: 4,
  ownLength: 936,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2001-12-09",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/one-piece/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
