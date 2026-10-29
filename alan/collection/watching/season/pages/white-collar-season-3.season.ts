import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const whiteCollarSeason3 = {
  id: "01a06802-b8c0-701d-8d79-07baaffc3aaf",
  type: "page-type/season",
  slug: "white-collar-season-3",
  title: "White Collar Season 3",
  partOfCollections: ["show/white-collar"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2011-06-08",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-31977",
      externalLink: "https://trakt.tv/shows/white-collar/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.968Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
  progressedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Season
