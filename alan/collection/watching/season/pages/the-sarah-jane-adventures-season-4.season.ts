import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theSarahJaneAdventuresSeason4 = {
  id: "01a06802-b8bf-7039-8be6-59305fac97bf",
  type: "page-type/season",
  slug: "the-sarah-jane-adventures-season-4",
  title: "The Sarah Jane Adventures Season 4",
  partOfCollections: ["show/the-sarah-jane-adventures"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2010-10-11",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-763",
      externalLink: "https://trakt.tv/shows/the-sarah-jane-adventures/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T15:47:18.491Z",
} as const satisfies Season
