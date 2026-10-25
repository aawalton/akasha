import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aMerryScottishChristmas = {
  id: "01a1749a-66bb-771a-9de5-cb2bd4ef7a0f",
  type: "page-type/movie",
  slug: "a-merry-scottish-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-11-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1145635",
      externalLink: "https://www.themoviedb.org/movie/1145635",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Merry Scottish Christmas",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt28237077",
  posterPath: "/joJJfcxIO106BS4iy1kAdbgJxeQ.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
