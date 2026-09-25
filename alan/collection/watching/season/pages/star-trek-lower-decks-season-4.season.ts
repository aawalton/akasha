import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekLowerDecksSeason4 = {
  id: "01a06802-b8bd-7006-9f4e-8788b1eb62bb",
  type: "page-type/season",
  slug: "star-trek-lower-decks-season-4",
  title: "Star Trek: Lower Decks Season 4",
  partOfCollections: ["show/star-trek-lower-decks"],
  position: 4,
  ownLength: 264,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-09-07",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-lower-decks/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
