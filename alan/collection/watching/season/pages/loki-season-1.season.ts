import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const lokiSeason1 = {
  id: "01a06802-b8ba-7030-a647-78aecbc366b5",
  type: "page-type/season",
  slug: "loki-season-1",
  title: "Loki Season 1",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 30,
  ownLength: 301.8,
  ownProgress: 301.8,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-06-10",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/loki/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
