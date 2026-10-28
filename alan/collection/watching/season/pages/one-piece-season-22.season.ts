import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const onePieceSeason22 = {
  id: "01a06802-b8bb-7051-8b22-acddce6b8452",
  type: "page-type/season",
  slug: "one-piece-season-22",
  title: "One Piece Season 22",
  partOfCollections: ["show/one-piece"],
  position: 22,
  ownLength: 1174.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-01-07",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/one-piece/seasons/22",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-28T21:27:44.915Z",
} as const satisfies Season
