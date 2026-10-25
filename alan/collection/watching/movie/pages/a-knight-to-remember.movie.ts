import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aKnightToRemember = {
  id: "01a1749a-c867-76ab-bc65-8d42df34ffab",
  type: "page-type/movie",
  slug: "a-knight-to-remember",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1744203",
      externalLink: "https://www.themoviedb.org/movie/1744203",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Knight to Remember",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt44536647",
  posterPath: "/pEEhqRKfAntp8u3wXA14HJvHfsr.jpg",
  voteAverage: 8,
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
