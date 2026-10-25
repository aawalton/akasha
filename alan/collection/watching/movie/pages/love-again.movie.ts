import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveAgain = {
  id: "01a17499-8946-7adf-bf87-6c34cd9a2165",
  type: "page-type/movie",
  slug: "love-again",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2015-06-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "346228",
      externalLink: "https://www.themoviedb.org/movie/346228",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love, Again",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt4622202",
  posterPath: "/eMxFVWWzuGBoYuK8mW5haFckP1j.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "FXNow",
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "The CW",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
