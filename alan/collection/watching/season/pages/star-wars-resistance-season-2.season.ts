import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starWarsResistanceSeason2 = {
  id: "01a06802-b8bd-7035-91ee-ba59975b0143",
  type: "page-type/season",
  slug: "star-wars-resistance-season-2",
  title: "Star Wars Resistance Season 2",
  partOfCollections: ["show/star-wars-resistance"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-10-07",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-196921",
      externalLink: "https://trakt.tv/shows/star-wars-resistance/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.965Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Season
