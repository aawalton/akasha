import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const personOfInterestSpecials = {
  id: "01a06802-b8bc-7017-8be4-4d8b81ca3a3d",
  type: "page-type/season",
  slug: "person-of-interest-specials",
  title: "Person of Interest Specials",
  partOfCollections: ["show/person-of-interest"],
  position: 0,
  ownLength: 283,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2012-09-05",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "0",
      externalLink: "https://trakt.tv/shows/person-of-interest/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
