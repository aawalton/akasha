import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const operationCupcake = {
  id: "01a17499-66a0-7b4a-9558-cf3102ead13d",
  type: "page-type/movie",
  slug: "operation-cupcake",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2012-06-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "180779",
      externalLink: "https://www.themoviedb.org/movie/180779",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Operation Cupcake",
  genres: ["Comedy", "TV Movie"],
  imdbId: "tt2190316",
  posterPath: "/a8HxrQH401J8xwonReTLESKIXW9.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
