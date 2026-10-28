import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theWeddingVeilLegacy = {
  id: "01a1749a-464e-7e5b-b6a5-9bf92e6a01b9",
  type: "page-type/movie",
  slug: "the-wedding-veil-legacy",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/the-wedding-veil"],
  position: 3,
  publishedAt: "2022-02-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "910778",
      externalLink: "https://www.themoviedb.org/movie/910778",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Wedding Veil Legacy",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt17524492",
  posterPath: "/9knqC8aQvBH4NBGn05jYi07C9E0.jpg",
  voteAverage: 7.3,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
