import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mistletoeAndMimosas = {
  id: "01a1749a-c86a-7001-bedb-78b3a006307a",
  type: "page-type/movie",
  slug: "mistletoe-and-mimosas",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-11-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773340",
      externalLink: "https://www.themoviedb.org/movie/1773340",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mistletoe and Mimosas",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt46076026",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
