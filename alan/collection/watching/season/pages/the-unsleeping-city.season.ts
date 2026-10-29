import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theUnsleepingCity = {
  id: "01a06802-b8bf-704a-ab3d-4c059b2c0a38",
  type: "page-type/season",
  slug: "the-unsleeping-city",
  title: "The Unsleeping City",
  partOfCollections: ["show/dimension-20"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-07-09",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-194725",
      externalLink: "https://trakt.tv/shows/dimension-20/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T15:27:49.638Z",
} as const satisfies Season
