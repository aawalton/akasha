import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekLowerDecksSeason3 = {
  id: "01a06802-b8bd-7005-aa76-11b410cd03a3",
  type: "page-type/season",
  slug: "star-trek-lower-decks-season-3",
  title: "Star Trek: Lower Decks Season 3",
  partOfCollections: ["show/star-trek-lower-decks"],
  position: 3,
  ownLength: 276,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2022-08-25",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-lower-decks/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
