import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const marvelSRunawaysSeason3 = {
  id: "01a06802-b8ba-704f-aa24-60a5b4d323d7",
  type: "page-type/season",
  slug: "marvel-s-runaways-season-3",
  title: "Marvel's Runaways Season 3",
  partOfCollections: ["show/runaways"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-12-13",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-195764",
      externalLink: "https://trakt.tv/shows/marvel-s-runaways/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T15:40:06.602Z",
} as const satisfies Season
