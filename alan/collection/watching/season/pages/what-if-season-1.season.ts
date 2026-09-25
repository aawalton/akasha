import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const whatIfSeason1 = {
  id: "01a06802-b8c0-7018-93a1-e24f8bcdbbc0",
  type: "page-type/season",
  slug: "what-if-season-1",
  title: "What If...? Season 1",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 31,
  ownLength: 322.8,
  ownProgress: 322.8,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-08-11",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/what-if-2021/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
