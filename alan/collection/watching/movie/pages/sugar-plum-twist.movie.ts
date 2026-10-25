import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const sugarPlumTwist = {
  id: "01a1749a-464d-7f55-bd3d-a565d9771e8e",
  type: "page-type/movie",
  slug: "sugar-plum-twist",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-12-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "877831",
      externalLink: "https://www.themoviedb.org/movie/877831",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Sugar Plum Twist",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt15721028",
  posterPath: "/xFeXtGgY1sVr7kyyNCfi5DSS2nR.jpg",
  voteAverage: 6.1,
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
