import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const garageSaleMysteryTheArtOfMurder = {
  id: "01a17499-c95c-7c40-8bd6-dedaaf78ecc4",
  type: "page-type/movie",
  slug: "garage-sale-mystery-the-art-of-murder",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["franchise/garage-sale-mysteries"],
  position: 7,
  publishedAt: "2017-01-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "423671",
      externalLink: "https://www.themoviedb.org/movie/423671",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Garage Sale Mystery: The Art of Murder",
  genres: ["TV Movie", "Mystery"],
  imdbId: "tt5916786",
  posterPath: "/mhWeUkyX6uCfIyFh454gjOLpJWd.jpg",
  voteAverage: 6.333,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T20:45:07.643Z",
} as const satisfies Movie
