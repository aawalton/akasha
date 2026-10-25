import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const the27HourDay = {
  id: "01a1749a-259d-7fa1-8e26-b47558997edd",
  type: "page-type/movie",
  slug: "the-27-hour-day",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-08-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "847353",
      externalLink: "https://www.themoviedb.org/movie/847353",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The 27-Hour Day",
  genres: ["TV Movie", "Comedy", "Romance", "Family"],
  imdbId: "tt14632158",
  posterPath: "/s3K5Tztc7ERzYkZ3hC25x9ekx17.jpg",
  voteAverage: 7.1,
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
