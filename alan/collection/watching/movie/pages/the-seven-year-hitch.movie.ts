import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theSevenYearHitch = {
  id: "01a17499-66a2-789d-bb03-b38a5e3f03f4",
  type: "page-type/movie",
  slug: "the-seven-year-hitch",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2012-10-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "173557",
      externalLink: "https://www.themoviedb.org/movie/173557",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Seven Year Hitch",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt2343140",
  posterPath: "/2wwRnQQ4KLgmc24Y7fr8FqP2IER.jpg",
  voteAverage: 6,
  streamingOn: [
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
