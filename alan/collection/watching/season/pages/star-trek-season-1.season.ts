import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekSeason1 = {
  id: "01a06802-b8bd-700f-957a-d4abbbf68313",
  type: "page-type/season",
  slug: "star-trek-season-1",
  title: "Star Trek Season 1",
  partOfCollections: ["show/star-trek-2"],
  position: 1,
  ownLength: 1453.8,
  ownProgress: 1453.8,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "1966-09-09",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
