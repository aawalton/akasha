import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theSweetestChristmas = {
  id: "01a17499-c95f-72e9-bbb6-596ca6b93022",
  type: "page-type/movie",
  slug: "the-sweetest-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-11-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "474972",
      externalLink: "https://www.themoviedb.org/movie/474972",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Sweetest Christmas",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt7030432",
  posterPath: "/6HLnj8mYoIM9UW5h0aC6YVSpJKO.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
