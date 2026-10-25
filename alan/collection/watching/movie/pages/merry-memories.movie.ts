import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const merryMemories = {
  id: "01a1749a-c86a-72a4-b39e-2f0f6cf9f548",
  type: "page-type/movie",
  slug: "merry-memories",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-11-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773363",
      externalLink: "https://www.themoviedb.org/movie/1773363",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Merry Memories",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt46075438",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
