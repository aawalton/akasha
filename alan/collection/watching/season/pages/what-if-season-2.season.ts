import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const whatIfSeason2 = {
  id: "01a06802-b8c0-7019-b59c-a733223a6a2e",
  type: "page-type/season",
  slug: "what-if-season-2",
  title: "What If...? Season 2",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 47,
  ownLength: 289.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-12-22",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/what-if-2021/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
