import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aChristmasDuet = {
  id: "01a17499-e800-7d14-87f0-68ca2e5142fe",
  type: "page-type/movie",
  slug: "a-christmas-duet",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "631417",
      externalLink: "https://www.themoviedb.org/movie/631417",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Christmas Duet",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10768208",
  posterPath: "/b3zMgAU9hppKmInnQgsmWUqaNqt.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/pluto-tv",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
