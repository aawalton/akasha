import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasMagic = {
  id: "01a17499-669d-7b54-924d-2e5bc3959af7",
  type: "page-type/movie",
  slug: "christmas-magic",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2011-12-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "81420",
      externalLink: "https://www.themoviedb.org/movie/81420",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Magic",
  genres: ["TV Movie", "Family", "Fantasy"],
  imdbId: "tt2112127",
  posterPath: "/xPtGTM8ZAKrtKT2xnEy3b7FO5R8.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
