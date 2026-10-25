import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const veryVeryValentine = {
  id: "01a17499-c960-7bb3-8c25-9d96d4f7884c",
  type: "page-type/movie",
  slug: "very-very-valentine",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2018-02-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "499128",
      externalLink: "https://www.themoviedb.org/movie/499128",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Very, Very Valentine",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt7936510",
  posterPath: "/4WPjw8fOnOJLlGhQbsbBBau50rj.jpg",
  voteAverage: 6.391,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
