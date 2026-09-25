import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekDeepSpaceNineSeason2 = {
  id: "01a06802-b8bc-7046-95d0-c0aea2516e77",
  type: "page-type/season",
  slug: "star-trek-deep-space-nine-season-2",
  title: "Star Trek: Deep Space Nine Season 2",
  partOfCollections: ["show/star-trek-deep-space-nine"],
  position: 2,
  ownLength: 1170,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1993-09-26",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-deep-space-nine/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
