import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const becauseOfCupid = {
  id: "01a1749a-c868-7dac-8be5-7d5e012bf8cd",
  type: "page-type/movie",
  slug: "because-of-cupid",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-02-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1608616",
      externalLink: "https://www.themoviedb.org/movie/1608616",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Because of Cupid",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt39141493",
  posterPath: "/qLcGqmRs8pMUxYshdqXy7ECg7BX.jpg",
  voteAverage: 7.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
