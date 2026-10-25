import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const notesOfAutumn = {
  id: "01a1749a-66c0-71bf-8408-458d83782c06",
  type: "page-type/movie",
  slug: "notes-of-autumn",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-09-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1166713",
      externalLink: "https://www.themoviedb.org/movie/1166713",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Notes of Autumn",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt28690326",
  posterPath: "/zilvOVfT2JYcEH3sZ2LGdSPy2Xb.jpg",
  voteAverage: 6.413,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
