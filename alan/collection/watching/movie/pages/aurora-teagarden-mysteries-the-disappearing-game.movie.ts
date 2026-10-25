import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const auroraTeagardenMysteriesTheDisappearingGame = {
  id: "01a17499-e801-7190-8904-1a4279d57f44",
  type: "page-type/movie",
  slug: "aurora-teagarden-mysteries-the-disappearing-game",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["franchise/aurora-teagarden-mystery"],
  position: 8,
  publishedAt: "2018-07-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "531158",
      externalLink: "https://www.themoviedb.org/movie/531158",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Aurora Teagarden Mysteries: The Disappearing Game",
  genres: ["TV Movie", "Drama", "Crime", "Mystery"],
  imdbId: "tt8490686",
  posterPath: "/n922tm6mZm3m2XNv7VzhGqxgFF6.jpg",
  voteAverage: 7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
