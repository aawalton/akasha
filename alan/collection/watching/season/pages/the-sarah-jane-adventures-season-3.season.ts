import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theSarahJaneAdventuresSeason3 = {
  id: "01a06802-b8bf-7038-ae64-ff8ba72153f6",
  type: "page-type/season",
  slug: "the-sarah-jane-adventures-season-3",
  title: "The Sarah Jane Adventures Season 3",
  partOfCollections: ["show/the-sarah-jane-adventures"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2009-10-15",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-762",
      externalLink: "https://trakt.tv/shows/the-sarah-jane-adventures/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T15:47:18.491Z",
} as const satisfies Season
