import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const onePieceSeason17 = {
  id: "01a06802-b8bb-704b-ab7c-13d0ed37dad7",
  type: "page-type/season",
  slug: "one-piece-season-17",
  title: "One Piece Season 17",
  partOfCollections: ["show/one-piece"],
  position: 17,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2015-05-17",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/one-piece/seasons/17",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:38:30.731Z",
} as const satisfies Season
