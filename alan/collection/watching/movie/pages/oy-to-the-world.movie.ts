import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const oyToTheWorld = {
  id: "01a1749a-c86a-7085-912f-7562a467d0f2",
  type: "page-type/movie",
  slug: "oy-to-the-world",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2025-12-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1547926",
      externalLink: "https://www.themoviedb.org/movie/1547926",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Oy to the World!",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt38354983",
  posterPath: "/h85nutxhLeuseSiEZTN8061fS6i.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
