import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveLocks = {
  id: "01a17499-a7d6-74f0-b04f-925cf0960920",
  type: "page-type/movie",
  slug: "love-locks",
  ownLength: 95,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-01-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "428586",
      externalLink: "https://www.themoviedb.org/movie/428586",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love Locks",
  genres: ["TV Movie", "Romance", "Drama"],
  imdbId: "tt6382412",
  posterPath: "/r3tn7a90Dy0QZM5cBQCdFADPkn1.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Plex",
    "Plex Channel",
    "YouTube Free",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
