import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theMentalistSeason4 = {
  id: "01a06802-b8bf-701f-b8ac-6016d748af7a",
  type: "page-type/season",
  slug: "the-mentalist-season-4",
  title: "The Mentalist Season 4",
  partOfCollections: ["show/the-mentalist"],
  position: 4,
  ownLength: 1012,
  ownProgress: 1012,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2011-09-23",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "4",
      externalLink: "https://trakt.tv/shows/the-mentalist/seasons/4",
      lastSyncedAt: "2026-01-01",
    },
  ],
} as const satisfies Season
