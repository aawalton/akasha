import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const marvelSRunawaysSeason2 = {
  id: "01a06802-b8ba-704e-9e5e-f49448935872",
  type: "page-type/season",
  slug: "marvel-s-runaways-season-2",
  title: "Marvel's Runaways Season 2",
  partOfCollections: ["show/runaways"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-12-21",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-168883",
      externalLink: "https://trakt.tv/shows/marvel-s-runaways/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T15:40:06.602Z",
} as const satisfies Season
