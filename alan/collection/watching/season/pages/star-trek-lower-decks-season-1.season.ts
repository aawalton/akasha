import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekLowerDecksSeason1 = {
  id: "01a06802-b8bd-7003-af1c-95a5e27bcb23",
  type: "page-type/season",
  slug: "star-trek-lower-decks-season-1",
  title: "Star Trek: Lower Decks Season 1",
  partOfCollections: ["show/star-trek-lower-decks"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2020-08-06",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-lower-decks/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.965Z",
  updatedAt: "2026-10-29T15:41:40.042Z",
} as const satisfies Season
