import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekDeepSpaceNineSeason5 = {
  id: "01a06802-b8bc-7049-9f43-df954ab2d252",
  type: "page-type/season",
  slug: "star-trek-deep-space-nine-season-5",
  title: "Star Trek: Deep Space Nine Season 5",
  partOfCollections: ["show/star-trek-deep-space-nine"],
  position: 5,
  ownLength: 1170,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1996-09-30",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-deep-space-nine/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
