import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const highPotentialSeason2 = {
  id: "01a06802-b8ba-7026-b1d0-491bfb61f98c",
  type: "page-type/season",
  slug: "high-potential-season-2",
  title: "High Potential Season 2",
  partOfCollections: ["show/high-potential"],
  position: 2,
  ownLength: 1074.384,
  ownProgress: 1074.384,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2025-09-17",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-475519",
      externalLink: "https://trakt.tv/shows/high-potential/seasons/2",
      lastSyncedAt: "2026-01-02",
    },
  ],
} as const satisfies Season
