import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const everySecondCounts = {
  id: "01a17499-470c-795c-b722-569b6263190c",
  type: "page-type/movie",
  slug: "every-second-counts",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2008-07-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "59713",
      externalLink: "https://www.themoviedb.org/movie/59713",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Every Second Counts",
  genres: ["Drama", "Family", "TV Movie"],
  imdbId: "tt1202521",
  posterPath: "/bSKEMWWRvI35GPHhKxaGhEoi1ze.jpg",
  voteAverage: 4.8,
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
