import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const bestServedColdAHannahSwensenMystery = {
  id: "01a1749a-c868-7144-948a-2ce7fe9fb289",
  type: "page-type/movie",
  slug: "best-served-cold-a-hannah-swensen-mystery",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/hannah-swensen-mysteries"],
  position: 13,
  publishedAt: "2026-05-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1663527",
      externalLink: "https://www.themoviedb.org/movie/1663527",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Best Served Cold: A Hannah Swensen Mystery",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt41435250",
  posterPath: "/4csEhoQbnMjRUbmKwwlNuIX50rK.jpg",
  voteAverage: 7.333,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
