import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const garageSaleMysteryTheNovelMurders = {
  id: "01a17499-a7d4-7b94-aa10-a7816f8e9b04",
  type: "page-type/movie",
  slug: "garage-sale-mystery-the-novel-murders",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/garage-sale-mysteries"],
  position: 5,
  publishedAt: "2016-06-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "396390",
      externalLink: "https://www.themoviedb.org/movie/396390",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Garage Sale Mystery: The Novel Murders",
  genres: ["TV Movie", "Mystery"],
  imdbId: "tt5672502",
  posterPath: "/9SEBCZIriFD9sbCMEN7iNDMUN9B.jpg",
  voteAverage: 6.313,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
