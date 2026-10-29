import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const personOfInterestSeason4 = {
  id: "01a06802-b8bc-7015-9496-b4d4c40c46c6",
  type: "page-type/season",
  slug: "person-of-interest-season-4",
  title: "Person of Interest Season 4",
  partOfCollections: ["show/person-of-interest"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2014-09-24",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "4",
      externalLink: "https://trakt.tv/shows/person-of-interest/seasons/4",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Season
