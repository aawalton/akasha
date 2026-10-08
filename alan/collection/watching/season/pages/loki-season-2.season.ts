import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const lokiSeason2 = {
  id: "01a06802-b8ba-7031-89e0-ec5a31ef2508",
  type: "page-type/season",
  slug: "loki-season-2",
  title: "Loki Season 2",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 44,
  ownLength: 313.2,
  ownProgress: 313.2,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2023-10-06",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/loki/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
