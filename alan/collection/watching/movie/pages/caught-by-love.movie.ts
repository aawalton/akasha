import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const caughtByLove = {
  id: "01a1749a-c868-7a22-a218-c6cb22c8b763",
  type: "page-type/movie",
  slug: "caught-by-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-01-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1591919",
      externalLink: "https://www.themoviedb.org/movie/1591919",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Caught by Love",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt39096089",
  posterPath: "/vuYeFhJn6MfrPJ36OF7mT0sE360.jpg",
  voteAverage: 6.5,
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
