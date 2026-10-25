import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aRoseForChristmas = {
  id: "01a17499-a7d3-7db1-ba24-25f2f58b326a",
  type: "page-type/movie",
  slug: "a-rose-for-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-01-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "421628",
      externalLink: "https://www.themoviedb.org/movie/421628",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Rose for Christmas",
  genres: ["Drama", "TV Movie", "Romance"],
  imdbId: "tt6284950",
  posterPath: "/11Wh6RWKNtPcDrdGd1aMM9kE2m3.jpg",
  voteAverage: 5.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
