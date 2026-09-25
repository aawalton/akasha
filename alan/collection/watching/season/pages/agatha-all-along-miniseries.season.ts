import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const agathaAllAlongMiniseries = {
  id: "01a06802-b8b7-700c-a9d0-92b7f96bf108",
  type: "page-type/season",
  slug: "agatha-all-along-miniseries",
  title: "Agatha All Along Miniseries",
  partOfCollections: ["show/agatha-all-along"],
  position: 1,
  ownLength: 379.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-09-19",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-279651",
      externalLink: "https://trakt.tv/shows/agatha-all-along/seasons/1",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
