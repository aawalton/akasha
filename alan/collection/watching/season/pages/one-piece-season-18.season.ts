import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const onePieceSeason18 = {
  id: "01a06802-b8bb-704c-b215-e0ee8c10c30b",
  type: "page-type/season",
  slug: "one-piece-season-18",
  title: "One Piece Season 18",
  partOfCollections: ["show/one-piece"],
  position: 18,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2016-07-09",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/one-piece/seasons/18",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:38:30.731Z",
} as const satisfies Season
