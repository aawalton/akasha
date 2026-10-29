import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const onePieceSeason1 = {
  id: "01a06802-b8bb-7043-99c6-b7522af336a2",
  type: "page-type/season",
  slug: "one-piece-season-1",
  title: "One Piece Season 1",
  partOfCollections: ["show/one-piece"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "1999-10-20",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/one-piece/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T16:35:35.779Z",
  progressedAt: "2026-10-29T16:35:35.779Z",
} as const satisfies Season
