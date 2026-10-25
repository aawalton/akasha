import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const checkinItTwice = {
  id: "01a1749a-66bc-7553-8bdc-b64a56a3b1e2",
  type: "page-type/movie",
  slug: "checkin-it-twice",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-10-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1166012",
      externalLink: "https://www.themoviedb.org/movie/1166012",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Checkin' it Twice",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt29352965",
  posterPath: "/4mJK5blql4Ti3lWJYOr8wwVQ6Pn.jpg",
  voteAverage: 6.543,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
