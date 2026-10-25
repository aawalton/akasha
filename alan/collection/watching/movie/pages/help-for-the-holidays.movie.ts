import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const helpForTheHolidays = {
  id: "01a17499-669e-7c12-899f-e230e0f8f671",
  type: "page-type/movie",
  slug: "help-for-the-holidays",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2012-12-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "149235",
      externalLink: "https://www.themoviedb.org/movie/149235",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Help for the Holidays",
  genres: ["Family", "Fantasy", "TV Movie"],
  imdbId: "tt2374486",
  posterPath: "/pXKUeppxOmRIgL2Qyt7tIKrNQUA.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
