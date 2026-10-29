import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theMentalistSeason7 = {
  id: "01a06802-b8bf-7022-81a8-82175016fb33",
  type: "page-type/season",
  slug: "the-mentalist-season-7",
  title: "The Mentalist Season 7",
  partOfCollections: ["show/the-mentalist"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-12-01",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "7",
      externalLink: "https://trakt.tv/shows/the-mentalist/seasons/7",
      lastSyncedAt: "2026-01-01",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
  progressedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Season
