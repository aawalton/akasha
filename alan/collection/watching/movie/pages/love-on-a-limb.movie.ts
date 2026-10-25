import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveOnALimb = {
  id: "01a17499-a7d6-7959-a426-e7f2006c0c38",
  type: "page-type/movie",
  slug: "love-on-a-limb",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2016-10-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "412974",
      externalLink: "https://www.themoviedb.org/movie/412974",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love on a Limb",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt5968910",
  posterPath: "/73hqur493IUZQhl3DAM2NKo7O19.jpg",
  voteAverage: 6.4,
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
