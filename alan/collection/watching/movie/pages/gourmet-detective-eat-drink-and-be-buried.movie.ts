import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const gourmetDetectiveEatDrinkAndBeBuried = {
  id: "01a17499-c95c-7ef7-b5a0-98e8dc6bef9a",
  type: "page-type/movie",
  slug: "gourmet-detective-eat-drink-and-be-buried",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["franchise/gourmet-detective"],
  position: 4,
  publishedAt: "2017-10-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "479242",
      externalLink: "https://www.themoviedb.org/movie/479242",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Gourmet Detective: Eat, Drink, and be Buried",
  genres: ["Mystery", "TV Movie", "Crime", "Drama"],
  imdbId: "tt6619330",
  posterPath: "/zIoLMRyHYvc54yqlB9nLO4duFq1.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T20:45:07.643Z",
} as const satisfies Movie
