import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const marvelSIronFistSeason2 = {
  id: "01a06802-b8ba-7047-8917-0b996a9d70db",
  type: "page-type/season",
  slug: "marvel-s-iron-fist-season-2",
  title: "Marvel's Iron Fist Season 2",
  partOfCollections: ["show/iron-fist"],
  position: 2,
  ownLength: 526.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-09-07",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-168340",
      externalLink: "https://trakt.tv/shows/marvel-s-iron-fist/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
