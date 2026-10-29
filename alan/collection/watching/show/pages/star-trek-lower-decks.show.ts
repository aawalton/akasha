import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const starTrekLowerDecks = {
  id: "01a06802-9332-702a-87a1-cd80caa0b049",
  type: "page-type/show",
  slug: "star-trek-lower-decks",
  title: "Star Trek: Lower Decks",
  partOfCollections: ["fandom/star-trek-3"],
  position: 23,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2020-08-06",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-lower-decks",
      lastSyncedAt: "2025-10-02",
    },
    { source: "tmdb", externalId: "85948", externalLink: "https://www.themoviedb.org/tv/85948" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:41:40.042Z",
} as const satisfies Show
