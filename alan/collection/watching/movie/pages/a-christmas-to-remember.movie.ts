import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aChristmasToRemember = {
  id: "01a17499-a7d2-76f3-8ef8-0c6366def7c6",
  type: "page-type/movie",
  slug: "a-christmas-to-remember",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2016-12-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "423893",
      externalLink: "https://www.themoviedb.org/movie/423893",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Christmas to Remember",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt6288876",
  posterPath: "/xpOZBdq1bFf6nBSilkfLrtjhNL0.jpg",
  voteAverage: 6.038,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
