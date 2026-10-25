import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theJaneMysteriesADeadlyPrescription = {
  id: "01a1749a-a94d-7b7d-9220-b3f3c37c82ef",
  type: "page-type/movie",
  slug: "the-jane-mysteries-a-deadly-prescription",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/the-jane-mysteries"],
  position: 2,
  publishedAt: "2024-09-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1329923",
      externalLink: "https://www.themoviedb.org/movie/1329923",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Jane Mysteries: A Deadly Prescription",
  genres: ["TV Movie", "Mystery"],
  imdbId: "tt30887705",
  posterPath: "/kA4gnLhsawCtJNsWDuDFqQblp13.jpg",
  voteAverage: 6.5,
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
