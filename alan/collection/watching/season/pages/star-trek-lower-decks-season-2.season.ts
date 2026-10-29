import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekLowerDecksSeason2 = {
  id: "01a06802-b8bd-7004-83cc-9170f657ca25",
  type: "page-type/season",
  slug: "star-trek-lower-decks-season-2",
  title: "Star Trek: Lower Decks Season 2",
  partOfCollections: ["show/star-trek-lower-decks"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-08-12",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-lower-decks/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.965Z",
  updatedAt: "2026-10-29T15:41:40.042Z",
} as const satisfies Season
