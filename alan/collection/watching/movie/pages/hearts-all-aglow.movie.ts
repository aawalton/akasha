import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const heartsAllAglow = {
  id: "01a1749a-c869-7339-a07e-88dc16ee237c",
  type: "page-type/movie",
  slug: "hearts-all-aglow",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-12-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773270",
      externalLink: "https://www.themoviedb.org/movie/1773270",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Hearts All Aglow",
  genres: ["Romance"],
  imdbId: "tt46076903",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
