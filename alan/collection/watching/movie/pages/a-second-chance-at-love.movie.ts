import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aSecondChanceAtLove = {
  id: "01a1749a-4649-79d4-a4e9-c8f707e22888",
  type: "page-type/movie",
  slug: "a-second-chance-at-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-03-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "933336",
      externalLink: "https://www.themoviedb.org/movie/933336",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Second Chance at Love",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt17490868",
  posterPath: "/5yASwcJhPEN0q99jYVcr4pdfZEx.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
