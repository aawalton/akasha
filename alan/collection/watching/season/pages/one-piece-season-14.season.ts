import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const onePieceSeason14 = {
  id: "01a06802-b8bb-7048-95d8-6362ca3984d8",
  type: "page-type/season",
  slug: "one-piece-season-14",
  title: "One Piece Season 14",
  partOfCollections: ["show/one-piece"],
  position: 14,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2011-11-13",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/one-piece/seasons/14",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:38:30.731Z",
} as const satisfies Season
