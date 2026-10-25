import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mistletoeOverManhattan = {
  id: "01a17499-66a0-76db-a2dd-a4aad690f84d",
  type: "page-type/movie",
  slug: "mistletoe-over-manhattan",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2011-11-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "141976",
      externalLink: "https://www.themoviedb.org/movie/141976",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mistletoe Over Manhattan",
  genres: ["TV Movie", "Family"],
  imdbId: "tt2064865",
  posterPath: "/6Ez3STVdxOLt5es7WJexHvSSayQ.jpg",
  voteAverage: 6,
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
