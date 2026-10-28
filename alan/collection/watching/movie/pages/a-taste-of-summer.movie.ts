import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aTasteOfSummer = {
  id: "01a17499-e801-7ad1-9acb-ba39a3967af3",
  type: "page-type/movie",
  slug: "a-taste-of-summer",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-08-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "612308",
      externalLink: "https://www.themoviedb.org/movie/612308",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Taste of Summer",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt10345024",
  posterPath: "/43i6SAmBASqhtCKluSQ4H7IGdQH.jpg",
  voteAverage: 6.4,
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
