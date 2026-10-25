import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveInParadise = {
  id: "01a17499-8946-7f7c-8972-d237abef2638",
  type: "page-type/movie",
  slug: "love-in-paradise",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2016-01-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "374603",
      externalLink: "https://www.themoviedb.org/movie/374603",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love in Paradise",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt5313016",
  posterPath: "/2X1ZTZY442QYsLdUrW6Gk8x05bO.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
