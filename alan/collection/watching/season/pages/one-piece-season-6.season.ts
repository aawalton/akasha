import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const onePieceSeason6 = {
  id: "01a06802-b8bc-7003-bc2b-7aba3c00d1aa",
  type: "page-type/season",
  slug: "one-piece-season-6",
  title: "One Piece Season 6",
  partOfCollections: ["fandom/one-piece"],
  position: 6,
  ownLength: 1248,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2003-02-09",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/one-piece/seasons/6",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
