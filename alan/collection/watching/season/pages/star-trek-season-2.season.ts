import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekSeason2 = {
  id: "01a06802-b8bd-7010-9395-6d83479bd4e3",
  type: "page-type/season",
  slug: "star-trek-season-2",
  title: "Star Trek Season 2",
  partOfCollections: ["show/star-trek-2"],
  position: 2,
  ownLength: 1305,
  ownProgress: 1305,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "1967-09-16",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
