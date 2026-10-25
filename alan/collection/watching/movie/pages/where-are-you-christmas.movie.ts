import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const whereAreYouChristmas = {
  id: "01a1749a-66c2-7646-926b-be8d25ee3766",
  type: "page-type/movie",
  slug: "where-are-you-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-10-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1132390",
      externalLink: "https://www.themoviedb.org/movie/1132390",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Where Are You, Christmas?",
  genres: ["TV Movie", "Drama", "Fantasy"],
  imdbId: "tt27496114",
  posterPath: "/6j3A3Rnm0SyMuGmROAsUaGb4Klx.jpg",
  voteAverage: 6.345,
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
