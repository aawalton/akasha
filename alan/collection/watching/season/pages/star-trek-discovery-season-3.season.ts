import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekDiscoverySeason3 = {
  id: "01a06802-b8bc-704f-831b-27238859004d",
  type: "page-type/season",
  slug: "star-trek-discovery-season-3",
  title: "Star Trek: Discovery Season 3",
  partOfCollections: ["show/star-trek-discovery"],
  position: 3,
  ownLength: 670.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2020-10-15",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-discovery/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
