import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const thePunisher = {
  id: "01a06802-9333-7000-b8a0-89cec056daea",
  type: "page-type/show",
  slug: "the-punisher",
  title: "The Punisher",
  partOfCollections: ["fandom/marvel-television"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-11-17",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/marvel-s-the-punisher",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "67178", externalLink: "https://www.themoviedb.org/tv/67178" },
  ],
  createdAt: "2026-09-03T16:03:14.355Z",
  updatedAt: "2026-10-29T15:47:05.993Z",
} as const satisfies Show
