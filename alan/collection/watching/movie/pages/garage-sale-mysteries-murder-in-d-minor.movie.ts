import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const garageSaleMysteriesMurderInDMinor = {
  id: "01a17499-e803-76e9-80f9-98641f57b52c",
  type: "page-type/movie",
  slug: "garage-sale-mysteries-murder-in-d-minor",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/garage-sale-mysteries"],
  position: 15,
  publishedAt: "2018-08-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "540489",
      externalLink: "https://www.themoviedb.org/movie/540489",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Garage Sale Mysteries: Murder in D Minor",
  genres: ["Mystery", "TV Movie", "Crime", "Drama"],
  imdbId: "tt8750664",
  posterPath: "/833ohLA4lvx3ktYWKDGlUXgSeMR.jpg",
  voteAverage: 6.278,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T20:45:10.655Z",
} as const satisfies Movie
