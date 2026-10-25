import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const returnToOffice = {
  id: "01a1749a-a94c-7c5e-8231-13bdce32caf7",
  type: "page-type/movie",
  slug: "return-to-office",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2025-02-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1414166",
      externalLink: "https://www.themoviedb.org/movie/1414166",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Return to Office",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt35304920",
  posterPath: "/kOeZY4KhapLxPT9oAAVvZu80DTN.jpg",
  voteAverage: 6.757,
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
