import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const inMerryMeasure = {
  id: "01a1749a-464b-7e5b-b433-de1dc87c5122",
  type: "page-type/movie",
  slug: "in-merry-measure",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-11-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028180",
      externalLink: "https://www.themoviedb.org/movie/1028180",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "In Merry Measure",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt22246626",
  posterPath: "/g36Apd5ESbHm4mXoHX3lA58OB92.jpg",
  voteAverage: 6.7,
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
