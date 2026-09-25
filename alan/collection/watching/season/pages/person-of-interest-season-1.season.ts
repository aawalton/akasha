import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const personOfInterestSeason1 = {
  id: "01a06802-b8bc-7012-ad47-17cf4cd08eb0",
  type: "page-type/season",
  slug: "person-of-interest-season-1",
  title: "Person of Interest Season 1",
  partOfCollections: ["show/person-of-interest"],
  position: 1,
  ownLength: 1011,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2011-09-23",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "1",
      externalLink: "https://trakt.tv/shows/person-of-interest/seasons/1",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
