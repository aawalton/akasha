import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasAtTheCatnipCafe = {
  id: "01a1749a-a949-7614-9963-4c87933cc5f9",
  type: "page-type/movie",
  slug: "christmas-at-the-catnip-cafe",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2025-11-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1545999",
      externalLink: "https://www.themoviedb.org/movie/1545999",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas at the Catnip Café",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt37985000",
  posterPath: "/4OdcIegFxwFIflJ0N0hXUXNtV93.jpg",
  voteAverage: 6.8,
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
