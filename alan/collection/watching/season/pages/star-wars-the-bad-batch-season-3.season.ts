import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starWarsTheBadBatchSeason3 = {
  id: "01a06802-b8bd-703b-991b-0afca3f525e3",
  type: "page-type/season",
  slug: "star-wars-the-bad-batch-season-3",
  title: "Star Wars: The Bad Batch Season 3",
  partOfCollections: ["show/star-wars-the-bad-batch"],
  position: 3,
  ownLength: 423,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-02-21",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-320716",
      externalLink: "https://trakt.tv/shows/star-wars-the-bad-batch/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
