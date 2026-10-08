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
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
