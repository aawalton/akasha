import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekTheNextGenerationSeason4 = {
  id: "01a06802-b8bd-701d-9fe3-51f9ac2ea012",
  type: "page-type/season",
  slug: "star-trek-the-next-generation-season-4",
  title: "Star Trek: The Next Generation Season 4",
  partOfCollections: ["show/star-trek-the-next-generation"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "1990-09-25",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-the-next-generation/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.965Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
  progressedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Season
