import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const chasingWaterfalls = {
  id: "01a1749a-2599-7e99-9343-45bf192cc988",
  type: "page-type/movie",
  slug: "chasing-waterfalls",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-03-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "793430",
      externalLink: "https://www.themoviedb.org/movie/793430",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Chasing Waterfalls",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt13110420",
  posterPath: "/eJxHoF3xqXIqamM0j9WlKxGKZ6a.jpg",
  voteAverage: 7.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
