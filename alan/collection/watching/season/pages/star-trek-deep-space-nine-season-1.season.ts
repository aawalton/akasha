import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekDeepSpaceNineSeason1 = {
  id: "01a06802-b8bc-7045-a898-cb53ce06b55f",
  type: "page-type/season",
  slug: "star-trek-deep-space-nine-season-1",
  title: "Star Trek: Deep Space Nine Season 1",
  partOfCollections: ["show/star-trek-deep-space-nine"],
  position: 1,
  ownLength: 898.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1993-01-03",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-deep-space-nine/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
