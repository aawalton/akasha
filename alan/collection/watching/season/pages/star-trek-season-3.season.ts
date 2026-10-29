import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekSeason3 = {
  id: "01a06802-b8bd-7011-93e7-3c467f1f7b17",
  type: "page-type/season",
  slug: "star-trek-season-3",
  title: "Star Trek Season 3",
  partOfCollections: ["show/star-trek-2"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "1968-09-21",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.965Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
  progressedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Season
