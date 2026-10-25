import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aGrandOleOpryChristmas = {
  id: "01a1749a-a948-7b29-9c1a-6ca77d51385c",
  type: "page-type/movie",
  slug: "a-grand-ole-opry-christmas",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2025-11-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1535221",
      externalLink: "https://www.themoviedb.org/movie/1535221",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Grand Ole Opry Christmas",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt37891014",
  posterPath: "/y5NqsOFBum7LyX6QHIakwG1plnI.jpg",
  voteAverage: 7.167,
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
