import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveOnSafari = {
  id: "01a17499-c95d-79e5-b85f-a7f2a636dd55",
  type: "page-type/movie",
  slug: "love-on-safari",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2018-07-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "525454",
      externalLink: "https://www.themoviedb.org/movie/525454",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love on Safari",
  genres: ["TV Movie", "Drama", "Romance"],
  imdbId: "tt7997256",
  posterPath: "/hzvkk5W0yqyyNESMzhOz9oYL95H.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
