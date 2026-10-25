import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const honeymoonForOne = {
  id: "01a17499-669f-7c82-b680-53e7fb32ee04",
  type: "page-type/movie",
  slug: "honeymoon-for-one",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2011-08-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "217292",
      externalLink: "https://www.themoviedb.org/movie/217292",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Honeymoon for One",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt1733737",
  posterPath: "/zPqLuvw9rgZOdiYroLvAhImILL5.jpg",
  voteAverage: 6,
  streamingOn: ["Xumo Play"],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
