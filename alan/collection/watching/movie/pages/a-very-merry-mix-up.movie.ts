import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aVeryMerryMixUp = {
  id: "01a17499-669c-7c89-9264-c2a3b0706a3f",
  type: "page-type/movie",
  slug: "a-very-merry-mix-up",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2013-11-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "238749",
      externalLink: "https://www.themoviedb.org/movie/238749",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/A_Very_Merry_Mix-Up" },
  ],
  title: "A Very Merry Mix-Up",
  genres: ["TV Movie", "Romance", "Comedy", "Drama"],
  imdbId: "tt3131456",
  posterPath: "/7WwGwKE9yMB90EsXduuPTX3iBbL.jpg",
  voteAverage: 6.039,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
