import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const marvelSRunawaysSeason1 = {
  id: "01a06802-b8ba-704d-9623-94e81f77e766",
  type: "page-type/season",
  slug: "marvel-s-runaways-season-1",
  title: "Marvel's Runaways Season 1",
  partOfCollections: ["show/runaways"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-11-21",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-147687",
      externalLink: "https://trakt.tv/shows/marvel-s-runaways/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T15:40:06.602Z",
} as const satisfies Season
