import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const onePieceSeason11 = {
  id: "01a06802-b8bb-7045-abd4-81e00b2acefd",
  type: "page-type/season",
  slug: "one-piece-season-11",
  title: "One Piece Season 11",
  partOfCollections: ["show/one-piece"],
  position: 11,
  ownLength: 624,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2008-12-21",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/one-piece/seasons/11",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-28T21:27:44.915Z",
} as const satisfies Season
