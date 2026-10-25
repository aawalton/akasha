import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const auroraTeagardenMysteriesHauntedByMurder = {
  id: "01a1749a-66bc-731c-aa8c-16fd8e2d19dd",
  type: "page-type/movie",
  slug: "aurora-teagarden-mysteries-haunted-by-murder",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/aurora-teagarden-mystery"],
  position: 17,
  publishedAt: "2022-02-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "910765",
      externalLink: "https://www.themoviedb.org/movie/910765",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Aurora Teagarden Mysteries: Haunted by Murder",
  genres: ["TV Movie", "Mystery", "Crime", "Drama"],
  imdbId: "tt15829754",
  posterPath: "/76U8bHFPFXgfsdqLNOuNOzTk5tA.jpg",
  voteAverage: 7.024,
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
