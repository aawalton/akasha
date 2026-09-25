import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theMentalistSeason5 = {
  id: "01a06802-b8bf-7020-b17b-a5f47f8106dc",
  type: "page-type/season",
  slug: "the-mentalist-season-5",
  title: "The Mentalist Season 5",
  partOfCollections: ["show/the-mentalist"],
  position: 5,
  ownLength: 935,
  ownProgress: 935,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2012-10-01",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "5",
      externalLink: "https://trakt.tv/shows/the-mentalist/seasons/5",
      lastSyncedAt: "2026-01-01",
    },
  ],
} as const satisfies Season
