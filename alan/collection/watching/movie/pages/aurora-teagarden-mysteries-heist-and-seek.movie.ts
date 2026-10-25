import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const auroraTeagardenMysteriesHeistAndSeek = {
  id: "01a1749a-2599-72f4-9b5a-a7a0f2e2f4dd",
  type: "page-type/movie",
  slug: "aurora-teagarden-mysteries-heist-and-seek",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/aurora-teagarden-mystery"],
  position: 13,
  publishedAt: "2020-05-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "681638",
      externalLink: "https://www.themoviedb.org/movie/681638",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Aurora Teagarden Mysteries: Heist and Seek",
  genres: ["Mystery", "TV Movie", "Crime"],
  imdbId: "tt11686326",
  posterPath: "/s0Jh029ZNtTmjEG8X4DUblFN8nl.jpg",
  voteAverage: 7.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T20:45:16.967Z",
} as const satisfies Movie
