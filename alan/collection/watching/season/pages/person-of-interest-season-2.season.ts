import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const personOfInterestSeason2 = {
  id: "01a06802-b8bc-7013-a6b4-6b347a4a8b03",
  type: "page-type/season",
  slug: "person-of-interest-season-2",
  title: "Person of Interest Season 2",
  partOfCollections: ["show/person-of-interest"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2012-09-28",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "2",
      externalLink: "https://trakt.tv/shows/person-of-interest/seasons/2",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Season
