import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const whiteCollarSeason4 = {
  id: "01a06802-b8c0-701e-8397-181568eec591",
  type: "page-type/season",
  slug: "white-collar-season-4",
  title: "White Collar Season 4",
  partOfCollections: ["show/white-collar"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2012-07-11",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-31978",
      externalLink: "https://trakt.tv/shows/white-collar/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.968Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
  progressedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Season
