import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const stevenUniverseSeason3 = {
  id: "01a06802-b8be-700c-ac39-d36cb7348b5f",
  type: "page-type/season",
  slug: "steven-universe-season-3",
  title: "Steven Universe Season 3",
  partOfCollections: ["show/steven-universe"],
  position: 3,
  ownLength: 298.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2016-05-12",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-125705",
      externalLink: "https://trakt.tv/shows/steven-universe/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
