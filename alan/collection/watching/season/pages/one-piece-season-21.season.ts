import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const onePieceSeason21 = {
  id: "01a06802-b8bb-7050-80de-23d9b8a2b41c",
  type: "page-type/season",
  slug: "one-piece-season-21",
  title: "One Piece Season 21",
  partOfCollections: ["show/one-piece"],
  position: 21,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-07-07",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/one-piece/seasons/21",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:38:30.731Z",
} as const satisfies Season
