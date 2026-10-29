import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const whiteCollarSeason1 = {
  id: "01a06802-b8c0-701b-9c87-a2e8c353edc5",
  type: "page-type/season",
  slug: "white-collar-season-1",
  title: "White Collar Season 1",
  partOfCollections: ["show/white-collar"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2009-10-24",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-31975",
      externalLink: "https://trakt.tv/shows/white-collar/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.968Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
  progressedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Season
