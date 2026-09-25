import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const youngSheldonSeason7 = {
  id: "01a06802-b8c0-7028-8b92-866d0a45b71d",
  type: "page-type/season",
  slug: "young-sheldon-season-7",
  title: "Young Sheldon Season 7",
  partOfCollections: ["show/young-sheldon"],
  position: 7,
  ownLength: 286.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-02-16",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-340951",
      externalLink: "https://trakt.tv/shows/young-sheldon/seasons/7",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
