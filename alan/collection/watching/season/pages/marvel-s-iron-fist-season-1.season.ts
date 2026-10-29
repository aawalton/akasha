import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const marvelSIronFistSeason1 = {
  id: "01a06802-b8ba-7046-97ca-c0a071674a85",
  type: "page-type/season",
  slug: "marvel-s-iron-fist-season-1",
  title: "Marvel's Iron Fist Season 1",
  partOfCollections: ["show/iron-fist"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-03-17",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-133293",
      externalLink: "https://trakt.tv/shows/marvel-s-iron-fist/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T15:31:39.349Z",
} as const satisfies Season
