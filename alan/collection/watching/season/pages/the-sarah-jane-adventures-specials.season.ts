import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theSarahJaneAdventuresSpecials = {
  id: "01a06802-b8bf-703b-a5c1-a376033245c4",
  type: "page-type/season",
  slug: "the-sarah-jane-adventures-specials",
  title: "The Sarah Jane Adventures Specials",
  partOfCollections: ["show/the-sarah-jane-adventures"],
  position: 0,
  ownLength: 111,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2007-01-01",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-759",
      externalLink: "https://trakt.tv/shows/the-sarah-jane-adventures/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
