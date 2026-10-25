import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveAndSunshine = {
  id: "01a17499-e804-7366-b63c-04714396cbca",
  type: "page-type/movie",
  slug: "love-and-sunshine",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-08-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "612313",
      externalLink: "https://www.themoviedb.org/movie/612313",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love and Sunshine",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10369978",
  posterPath: "/vKNq4Q9o6TeQ2gpsDBMQ0pZLDV7.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
