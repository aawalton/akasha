import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const crusadeSeason1 = {
  id: "01a06802-b8b8-7045-bac0-da04c7c40141",
  type: "page-type/season",
  slug: "crusade-season-1",
  title: "Crusade Season 1",
  partOfCollections: ["show/crusade"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1999-06-10",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "1",
      externalLink: "https://trakt.tv/shows/crusade/seasons/1",
      lastSyncedAt: "2025-12-20",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T15:27:16.829Z",
} as const satisfies Season
