import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const onePieceSeason10 = {
  id: "01a06802-b8bb-7044-a9bd-1255c3d525ae",
  type: "page-type/season",
  slug: "one-piece-season-10",
  title: "One Piece Season 10",
  partOfCollections: ["show/one-piece"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2008-01-06",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/one-piece/seasons/10",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:38:30.731Z",
} as const satisfies Season
