import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const comeDanceWithMe = {
  id: "01a17499-669d-79ca-84dd-7c827bfb42a0",
  type: "page-type/movie",
  slug: "come-dance-with-me",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2012-12-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "149218",
      externalLink: "https://www.themoviedb.org/movie/149218",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Come Dance with Me",
  genres: ["Family", "Romance", "TV Movie"],
  imdbId: "tt2376272",
  posterPath: "/tUX6KoQ8Tivf7vfztfM1FrZ42R6.jpg",
  voteAverage: 5.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube Free",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
