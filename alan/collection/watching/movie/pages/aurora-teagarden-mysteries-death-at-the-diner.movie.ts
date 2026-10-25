import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const auroraTeagardenMysteriesDeathAtTheDiner = {
  id: "01a1749a-a949-7fd1-ae3d-12c0a0d17b5e",
  type: "page-type/movie",
  slug: "aurora-teagarden-mysteries-death-at-the-diner",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/aurora-teagarden-mystery"],
  position: 21,
  publishedAt: "2024-10-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1364939",
      externalLink: "https://www.themoviedb.org/movie/1364939",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Aurora Teagarden Mysteries: Death at the Diner",
  genres: ["TV Movie", "Mystery"],
  imdbId: "tt33771533",
  posterPath: "/958StP9qK9Khen8CwFD7ED8qWD9.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T20:45:28.240Z",
} as const satisfies Movie
