import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const stargateAtlantisSeason5 = {
  id: "01a06802-b8bd-7048-9550-e78efd8d98f4",
  type: "page-type/season",
  slug: "stargate-atlantis-season-5",
  title: "Stargate Atlantis Season 5",
  partOfCollections: ["show/stargate-atlantis"],
  position: 5,
  ownLength: 877.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2008-07-11",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-7514",
      externalLink: "https://trakt.tv/shows/stargate-atlantis/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
