import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const onePieceSeason7 = {
  id: "01a06802-b8bc-7004-9e8b-97e65b8d87ae",
  type: "page-type/season",
  slug: "one-piece-season-7",
  title: "One Piece Season 7",
  partOfCollections: ["show/one-piece"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2004-06-20",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/one-piece/seasons/7",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T15:38:30.731Z",
} as const satisfies Season
