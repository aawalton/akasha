import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theRaveningWar = {
  id: "01a06802-b8bf-702e-955a-4c71c47d18a6",
  type: "page-type/season",
  slug: "the-ravening-war",
  title: "The Ravening War",
  partOfCollections: ["show/dimension-20"],
  position: 17,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-05-10",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-321996",
      externalLink: "https://trakt.tv/shows/dimension-20/seasons/17",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T15:27:49.638Z",
} as const satisfies Season
