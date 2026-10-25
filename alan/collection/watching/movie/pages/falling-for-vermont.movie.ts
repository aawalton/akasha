import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const fallingForVermont = {
  id: "01a17499-c95c-7ce5-a881-6d657fc6384d",
  type: "page-type/movie",
  slug: "falling-for-vermont",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-09-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "475374",
      externalLink: "https://www.themoviedb.org/movie/475374",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Falling for Vermont",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt7131334",
  posterPath: "/kjgJNg7F6W8xQ3fIzLFVST0F7dS.jpg",
  voteAverage: 6.578,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
