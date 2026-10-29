import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const daredevilBornAgainSeason1 = {
  id: "01a06802-b8b8-7047-b85d-8f920cec8585",
  type: "page-type/season",
  slug: "daredevil-born-again-season-1",
  title: "Daredevil: Born Again Season 1",
  partOfCollections: ["show/daredevil-born-again"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-03-05",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-296106",
      externalLink: "https://trakt.tv/shows/daredevil-born-again/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T15:27:20.667Z",
} as const satisfies Season
