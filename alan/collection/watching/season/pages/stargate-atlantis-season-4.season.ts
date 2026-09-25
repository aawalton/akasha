import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const stargateAtlantisSeason4 = {
  id: "01a06802-b8bd-7047-ab6b-5fb7e4f47eb5",
  type: "page-type/season",
  slug: "stargate-atlantis-season-4",
  title: "Stargate Atlantis Season 4",
  partOfCollections: ["show/stargate-atlantis"],
  position: 4,
  ownLength: 876,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2007-09-28",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-7513",
      externalLink: "https://trakt.tv/shows/stargate-atlantis/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
