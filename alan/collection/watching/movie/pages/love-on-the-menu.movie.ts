import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveOnTheMenu = {
  id: "01a17499-e804-7bf3-b10e-ba210484757d",
  type: "page-type/movie",
  slug: "love-on-the-menu",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-02-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "577736",
      externalLink: "https://www.themoviedb.org/movie/577736",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love on the Menu",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt9695612",
  posterPath: "/bcrfseYuPAy1xMxKpFN1Ay9i27B.jpg",
  voteAverage: 6.698,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
