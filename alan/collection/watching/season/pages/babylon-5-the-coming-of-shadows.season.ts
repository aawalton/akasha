import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const babylon5TheComingOfShadows = {
  id: "01a06802-b8b7-7018-982f-e72c29879eae",
  type: "page-type/season",
  slug: "babylon-5-the-coming-of-shadows",
  title: "Babylon 5 The Coming of Shadows",
  partOfCollections: ["show/babylon-5"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1994-11-03",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "2",
      externalLink: "https://trakt.tv/shows/babylon-5/seasons/2",
      lastSyncedAt: "2025-12-20",
    },
  ],
  createdAt: "2026-09-03T16:03:23.959Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Season
