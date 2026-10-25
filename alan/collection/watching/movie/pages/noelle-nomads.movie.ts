import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const noelleNomads = {
  id: "01a1749a-c86a-77c7-bfb0-009ca08273cb",
  type: "page-type/movie",
  slug: "noelle-nomads",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-12-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773275",
      externalLink: "https://www.themoviedb.org/movie/1773275",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Noelle Nomads",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt46076883",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
