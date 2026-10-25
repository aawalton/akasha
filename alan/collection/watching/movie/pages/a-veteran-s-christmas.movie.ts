import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aVeteranSChristmas = {
  id: "01a17499-e801-78e6-9152-bf247a9de888",
  type: "page-type/movie",
  slug: "a-veteran-s-christmas",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-11-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "551863",
      externalLink: "https://www.themoviedb.org/movie/551863",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Veteran's Christmas",
  genres: ["TV Movie", "Family", "Drama"],
  imdbId: "tt9103602",
  posterPath: "/k3TNeyevlA5GHPtQaAzmaQcbinC.jpg",
  voteAverage: 6.472,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
