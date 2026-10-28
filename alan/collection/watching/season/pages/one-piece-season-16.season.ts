import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const onePieceSeason16 = {
  id: "01a06802-b8bb-704a-8826-b5a2ec53d60b",
  type: "page-type/season",
  slug: "one-piece-season-16",
  title: "One Piece Season 16",
  partOfCollections: ["show/one-piece"],
  position: 16,
  ownLength: 1200,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2014-05-04",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/one-piece/seasons/16",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-28T21:27:44.915Z",
} as const satisfies Season
