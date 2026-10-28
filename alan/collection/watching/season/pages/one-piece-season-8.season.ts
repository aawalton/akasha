import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const onePieceSeason8 = {
  id: "01a06802-b8bc-7005-8e3f-7d9da0df901e",
  type: "page-type/season",
  slug: "one-piece-season-8",
  title: "One Piece Season 8",
  partOfCollections: ["show/one-piece"],
  position: 8,
  ownLength: 840,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2005-04-17",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/one-piece/seasons/8",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-28T21:27:44.915Z",
} as const satisfies Season
