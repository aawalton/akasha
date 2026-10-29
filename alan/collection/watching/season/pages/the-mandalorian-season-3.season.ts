import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theMandalorianSeason3 = {
  id: "01a06802-b8bf-701a-bf3f-46db5610611a",
  type: "page-type/season",
  slug: "the-mandalorian-season-3",
  title: "The Mandalorian Season 3",
  partOfCollections: ["show/the-mandalorian"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-03-01",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-303219",
      externalLink: "https://trakt.tv/shows/the-mandalorian/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T15:46:37.224Z",
} as const satisfies Season
