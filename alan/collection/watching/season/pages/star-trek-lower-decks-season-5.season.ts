import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekLowerDecksSeason5 = {
  id: "01a06802-b8bd-7007-934a-e85a8f60dabb",
  type: "page-type/season",
  slug: "star-trek-lower-decks-season-5",
  title: "Star Trek: Lower Decks Season 5",
  partOfCollections: ["show/star-trek-lower-decks"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-10-24",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-lower-decks/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.965Z",
  updatedAt: "2026-10-29T15:41:40.042Z",
} as const satisfies Season
