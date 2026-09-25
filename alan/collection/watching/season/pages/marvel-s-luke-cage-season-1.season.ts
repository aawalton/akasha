import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const marvelSLukeCageSeason1 = {
  id: "01a06802-b8ba-704b-856e-9dd43dad2442",
  type: "page-type/season",
  slug: "marvel-s-luke-cage-season-1",
  title: "Marvel's Luke Cage Season 1",
  partOfCollections: ["show/luke-cage"],
  position: 1,
  ownLength: 703.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2016-09-30",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-104168",
      externalLink: "https://trakt.tv/shows/marvel-s-luke-cage/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
