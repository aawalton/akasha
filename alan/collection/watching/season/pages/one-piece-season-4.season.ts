import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const onePieceSeason4 = {
  id: "01a06802-b8bc-7001-b57b-3029d0cbb520",
  type: "page-type/season",
  slug: "one-piece-season-4",
  title: "One Piece Season 4",
  partOfCollections: ["show/one-piece"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2001-12-09",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/one-piece/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T15:38:30.731Z",
} as const satisfies Season
