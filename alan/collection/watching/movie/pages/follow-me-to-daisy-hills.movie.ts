import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const followMeToDaisyHills = {
  id: "01a1749a-06bc-7eaa-8d0b-9fdb1525cc42",
  type: "page-type/movie",
  slug: "follow-me-to-daisy-hills",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-09-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "733277",
      externalLink: "https://www.themoviedb.org/movie/733277",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Follow Me to Daisy Hills",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt13085592",
  posterPath: "/78UTvk1yE7zUVhqbK7bpuiuqWTx.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
