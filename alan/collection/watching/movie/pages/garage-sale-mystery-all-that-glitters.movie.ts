import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const garageSaleMysteryAllThatGlitters = {
  id: "01a17499-8945-7ebe-9ade-ef9a3c5c54fd",
  type: "page-type/movie",
  slug: "garage-sale-mystery-all-that-glitters",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["franchise/garage-sale-mysteries"],
  position: 1,
  publishedAt: "2014-10-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "300778",
      externalLink: "https://www.themoviedb.org/movie/300778",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Garage Sale Mystery: All That Glitters",
  genres: ["Mystery", "Family", "TV Movie"],
  imdbId: "tt3918546",
  posterPath: "/cuscqZp7dIaQXvLOr4NPhfGfmS.jpg",
  voteAverage: 6.402,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "The Roku Channel",
    "YouTube Free",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
