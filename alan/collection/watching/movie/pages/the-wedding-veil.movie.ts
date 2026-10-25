import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theWeddingVeil = {
  id: "01a1749a-464e-7c02-ad3c-b16fb82695f2",
  type: "page-type/movie",
  slug: "the-wedding-veil",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/the-wedding-veil"],
  position: 1,
  publishedAt: "2022-01-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "910759",
      externalLink: "https://www.themoviedb.org/movie/910759",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Wedding Veil",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt16287754",
  posterPath: "/zOaYiZyNZQotd1ye5Zw3WctDhy5.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T20:45:19.452Z",
} as const satisfies Movie
