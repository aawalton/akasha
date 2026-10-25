import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveByTheBook = {
  id: "01a17499-8946-7c59-b396-17c4bef9e69e",
  type: "page-type/movie",
  slug: "love-by-the-book",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2015-01-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "317110",
      externalLink: "https://www.themoviedb.org/movie/317110",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love by the Book",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt3918776",
  posterPath: "/iDnzTu6BgqDXgWfmAsRrl14hZFC.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
