import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const garageSaleMysteriesTheMaskMurder = {
  id: "01a17499-e803-7452-a7a2-27b5e6973a57",
  type: "page-type/movie",
  slug: "garage-sale-mysteries-the-mask-murder",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/garage-sale-mysteries"],
  position: 12,
  publishedAt: "2018-08-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "540486",
      externalLink: "https://www.themoviedb.org/movie/540486",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Garage Sale Mysteries: The Mask Murder",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt8080578",
  posterPath: "/7gR58YkpMHSayezpDrTvJu86QNT.jpg",
  voteAverage: 7.385,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
