import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const backyardWedding = {
  id: "01a17499-470b-77e0-b3f9-7ca008a342b9",
  type: "page-type/movie",
  slug: "backyard-wedding",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2011-01-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "126223",
      externalLink: "https://www.themoviedb.org/movie/126223",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Backyard Wedding",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt1559309",
  posterPath: "/gZ0u9PADT8YzdCwt34AzBRrT4ED.jpg",
  voteAverage: 6.3,
  streamingOn: ["PixL Amazon Channel", "Xumo Play"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
