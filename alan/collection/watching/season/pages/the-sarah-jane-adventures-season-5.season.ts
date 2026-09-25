import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theSarahJaneAdventuresSeason5 = {
  id: "01a06802-b8bf-703a-bc1d-95d13af680f7",
  type: "page-type/season",
  slug: "the-sarah-jane-adventures-season-5",
  title: "The Sarah Jane Adventures Season 5",
  partOfCollections: ["show/the-sarah-jane-adventures"],
  position: 5,
  ownLength: 180,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2011-10-03",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-764",
      externalLink: "https://trakt.tv/shows/the-sarah-jane-adventures/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
