import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const personOfInterestSeason3 = {
  id: "01a06802-b8bc-7014-9915-6de1f2501bd8",
  type: "page-type/season",
  slug: "person-of-interest-season-3",
  title: "Person of Interest Season 3",
  partOfCollections: ["show/person-of-interest"],
  position: 3,
  ownLength: 1011,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2013-09-25",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "3",
      externalLink: "https://trakt.tv/shows/person-of-interest/seasons/3",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
