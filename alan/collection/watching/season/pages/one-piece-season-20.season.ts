import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const onePieceSeason20 = {
  id: "01a06802-b8bb-704f-80dd-528df5460247",
  type: "page-type/season",
  slug: "one-piece-season-20",
  title: "One Piece Season 20",
  partOfCollections: ["show/one-piece"],
  position: 20,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-03-31",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/one-piece/seasons/20",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:38:30.731Z",
} as const satisfies Season
