import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mystery101KillerTiming = {
  id: "01a1749a-464c-764b-9cd4-4bad93b8e231",
  type: "page-type/movie",
  slug: "mystery-101-killer-timing",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/mystery-101"],
  position: 5,
  publishedAt: "2021-03-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "793252",
      externalLink: "https://www.themoviedb.org/movie/793252",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystery 101: Killer Timing",
  genres: ["Mystery", "TV Movie", "Crime", "Drama"],
  imdbId: "tt13582526",
  posterPath: "/ku52Y9p3ZcB6q9AfVqdpmtR8su6.jpg",
  voteAverage: 7.429,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
