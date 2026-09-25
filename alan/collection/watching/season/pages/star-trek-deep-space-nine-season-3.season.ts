import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekDeepSpaceNineSeason3 = {
  id: "01a06802-b8bc-7047-98a9-b2a7bcf536f5",
  type: "page-type/season",
  slug: "star-trek-deep-space-nine-season-3",
  title: "Star Trek: Deep Space Nine Season 3",
  partOfCollections: ["show/star-trek-deep-space-nine"],
  position: 3,
  ownLength: 1170,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1994-09-26",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-deep-space-nine/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
