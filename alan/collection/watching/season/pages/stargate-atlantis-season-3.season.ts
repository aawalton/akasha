import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const stargateAtlantisSeason3 = {
  id: "01a06802-b8bd-7046-a499-0fe3b3da7fda",
  type: "page-type/season",
  slug: "stargate-atlantis-season-3",
  title: "Stargate Atlantis Season 3",
  partOfCollections: ["show/stargate-atlantis"],
  position: 3,
  ownLength: 850.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2006-07-14",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-7512",
      externalLink: "https://trakt.tv/shows/stargate-atlantis/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
