import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const butlersInLove = {
  id: "01a1749a-4649-780e-ba5c-03cc2c2cac61",
  type: "page-type/movie",
  slug: "butlers-in-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-01-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "910768",
      externalLink: "https://www.themoviedb.org/movie/910768",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Butlers in Love",
  genres: ["Romance", "TV Movie", "Comedy", "Drama"],
  imdbId: "tt16287844",
  posterPath: "/dfNuyNMva5DJ9E2mM5t5ZDwYZjI.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
