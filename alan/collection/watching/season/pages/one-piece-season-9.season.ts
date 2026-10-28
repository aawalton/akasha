import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const onePieceSeason9 = {
  id: "01a06802-b8bc-7006-9773-89dcacdeba95",
  type: "page-type/season",
  slug: "one-piece-season-9",
  title: "One Piece Season 9",
  partOfCollections: ["show/one-piece"],
  position: 9,
  ownLength: 1752,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2006-05-21",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/one-piece/seasons/9",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-28T21:27:44.915Z",
} as const satisfies Season
