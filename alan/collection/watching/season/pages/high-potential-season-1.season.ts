import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const highPotentialSeason1 = {
  id: "01a06802-b8ba-7025-b088-2d8acf31fbfb",
  type: "page-type/season",
  slug: "high-potential-season-1",
  title: "High Potential Season 1",
  partOfCollections: ["show/high-potential"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2024-09-18",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-324301",
      externalLink: "https://trakt.tv/shows/high-potential/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T16:35:26.651Z",
  progressedAt: "2026-10-29T16:35:26.651Z",
} as const satisfies Season
