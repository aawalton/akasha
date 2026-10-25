import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const everythingChristmas = {
  id: "01a1749a-66bd-7f7d-840d-113358f632ef",
  type: "page-type/movie",
  slug: "everything-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-11-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180842",
      externalLink: "https://www.themoviedb.org/movie/1180842",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Everything Christmas",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt29520836",
  posterPath: "/3Y3nFpeMaKVUNSp6kk49TXCefzV.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
