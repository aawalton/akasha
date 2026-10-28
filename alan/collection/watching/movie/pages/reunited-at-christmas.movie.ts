import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const reunitedAtChristmas = {
  id: "01a17499-e805-7329-8635-2f1c24155db5",
  type: "page-type/movie",
  slug: "reunited-at-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-11-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "550084",
      externalLink: "https://www.themoviedb.org/movie/550084",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Reunited at Christmas",
  genres: ["Family", "TV Movie"],
  imdbId: "tt9033646",
  posterPath: "/6oA3qHkTFt64rH3RhE7YewuRIlo.jpg",
  voteAverage: 5.3,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
