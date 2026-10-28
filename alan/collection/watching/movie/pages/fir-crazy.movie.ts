import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const firCrazy = {
  id: "01a17499-669e-73b9-af47-553f05855e78",
  type: "page-type/movie",
  slug: "fir-crazy",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2013-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "213901",
      externalLink: "https://www.themoviedb.org/movie/213901",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Fir Crazy",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt2665200",
  posterPath: "/dzZQ3z0cjvyfLJi9Y9RESJs8l1F.jpg",
  voteAverage: 5.91,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/great-american-pure-flix",
    "streaming-service/tubi",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
