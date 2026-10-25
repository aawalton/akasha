import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const singleOnThe25th = {
  id: "01a1749a-a94c-78e1-8d00-5197fe5cea33",
  type: "page-type/movie",
  slug: "single-on-the-25th",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2025-12-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1545997",
      externalLink: "https://www.themoviedb.org/movie/1545997",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Single on the 25th",
  genres: ["Romance", "TV Movie", "Comedy", "Drama"],
  imdbId: "tt38347292",
  posterPath: "/5tYw1fstvTdpH6wInqY23oTIiiI.jpg",
  voteAverage: 7.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
