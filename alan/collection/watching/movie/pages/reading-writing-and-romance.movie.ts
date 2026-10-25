import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const readingWritingAndRomance = {
  id: "01a17499-66a1-7955-9791-baf7ba1faf00",
  type: "page-type/movie",
  slug: "reading-writing-and-romance",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2013-08-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "226183",
      externalLink: "https://www.themoviedb.org/movie/226183",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Reading, Writing, and Romance",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt2816628",
  posterPath: "/pkFeRtUkwkdhsGiO3wVsn3aXXkt.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
