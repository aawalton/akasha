import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starWarsTheBadBatchSeason2 = {
  id: "01a06802-b8bd-703a-9ecd-aea21ba79dfd",
  type: "page-type/season",
  slug: "star-wars-the-bad-batch-season-2",
  title: "Star Wars: The Bad Batch Season 2",
  partOfCollections: ["show/star-wars-the-bad-batch"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-01-04",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-295695",
      externalLink: "https://trakt.tv/shows/star-wars-the-bad-batch/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.965Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Season
