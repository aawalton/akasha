import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveOnTheSlopes = {
  id: "01a17499-c95d-7b8d-a3fc-e9463123fe49",
  type: "page-type/movie",
  slug: "love-on-the-slopes",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2018-01-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "493762",
      externalLink: "https://www.themoviedb.org/movie/493762",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love on the Slopes",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt7825514",
  posterPath: "/1YVFAR9EkvVhUrKjg4TsA6nD621.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
