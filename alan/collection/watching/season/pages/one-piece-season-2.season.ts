import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const onePieceSeason2 = {
  id: "01a06802-b8bb-704e-afdc-c49d42fa6e34",
  type: "page-type/season",
  slug: "one-piece-season-2",
  title: "One Piece Season 2",
  partOfCollections: ["show/one-piece"],
  position: 2,
  ownLength: 0,
  ownProgress: 291.15,
  unit: "unit/minutes",
  status: "paused",
  grade: "B",
  publishedAt: "2001-03-21",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/one-piece/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:38:30.731Z",
} as const satisfies Season
