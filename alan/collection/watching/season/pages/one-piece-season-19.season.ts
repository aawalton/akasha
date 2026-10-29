import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const onePieceSeason19 = {
  id: "01a06802-b8bb-704d-b30b-45450d6286d6",
  type: "page-type/season",
  slug: "one-piece-season-19",
  title: "One Piece Season 19",
  partOfCollections: ["show/one-piece"],
  position: 19,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-09-03",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/one-piece/seasons/19",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:38:30.731Z",
} as const satisfies Season
