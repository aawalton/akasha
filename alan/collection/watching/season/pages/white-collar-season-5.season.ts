import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const whiteCollarSeason5 = {
  id: "01a06802-b8c0-701f-8fd7-05b8a51fa093",
  type: "page-type/season",
  slug: "white-collar-season-5",
  title: "White Collar Season 5",
  partOfCollections: ["show/white-collar"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2013-10-18",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-31979",
      externalLink: "https://trakt.tv/shows/white-collar/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.968Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
  progressedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Season
