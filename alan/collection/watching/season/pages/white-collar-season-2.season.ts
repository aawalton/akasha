import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const whiteCollarSeason2 = {
  id: "01a06802-b8c0-701c-bf1c-80ca350fecbd",
  type: "page-type/season",
  slug: "white-collar-season-2",
  title: "White Collar Season 2",
  partOfCollections: ["show/white-collar"],
  position: 2,
  ownLength: 718.2,
  ownProgress: 718.2,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2010-07-14",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-31976",
      externalLink: "https://trakt.tv/shows/white-collar/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
