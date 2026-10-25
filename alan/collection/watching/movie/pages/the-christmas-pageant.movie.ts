import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasPageant = {
  id: "01a17499-66a2-714b-9ece-5d9114f07570",
  type: "page-type/movie",
  slug: "the-christmas-pageant",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2011-12-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "169510",
      externalLink: "https://www.themoviedb.org/movie/169510",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Christmas Pageant",
  genres: ["TV Movie", "Family"],
  imdbId: "tt2039390",
  posterPath: "/ctvZsLIRkaQM8S96iqy6urKCKd.jpg",
  voteAverage: 5.9,
  streamingOn: ["UP Faith & Family Amazon Channel ", "UP Faith & Family Apple TV channel"],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
