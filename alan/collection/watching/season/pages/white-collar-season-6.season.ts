import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const whiteCollarSeason6 = {
  id: "01a06802-b8c0-7020-914c-46e58736b787",
  type: "page-type/season",
  slug: "white-collar-season-6",
  title: "White Collar Season 6",
  partOfCollections: ["show/white-collar"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-11-07",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-62100",
      externalLink: "https://trakt.tv/shows/white-collar/seasons/6",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.968Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
  progressedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Season
