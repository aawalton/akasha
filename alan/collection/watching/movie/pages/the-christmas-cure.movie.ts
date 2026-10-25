import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasCure = {
  id: "01a17499-a7d8-7115-b9f8-036bbeec8806",
  type: "page-type/movie",
  slug: "the-christmas-cure",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-07-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "465501",
      externalLink: "https://www.themoviedb.org/movie/465501",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Christmas Cure",
  genres: ["TV Movie", "Romance", "Drama"],
  imdbId: "tt7123974",
  posterPath: "/q5lRVUm0qFUUP4Ffo7z6kAHflBL.jpg",
  voteAverage: 5.9,
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
