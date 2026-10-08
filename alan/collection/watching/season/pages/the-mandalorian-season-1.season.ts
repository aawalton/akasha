import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theMandalorianSeason1 = {
  id: "01a06802-b8bf-7018-bd30-0415580c9e5e",
  type: "page-type/season",
  slug: "the-mandalorian-season-1",
  title: "The Mandalorian Season 1",
  partOfCollections: ["show/the-mandalorian"],
  position: 1,
  ownLength: 331.2,
  ownProgress: 331.2,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-11-12",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-173610",
      externalLink: "https://trakt.tv/shows/the-mandalorian/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
