import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const signedSealedDeliveredLostWithoutYou = {
  id: "01a17499-a7d7-7bd5-bf88-acda1231dbd3",
  type: "page-type/movie",
  slug: "signed-sealed-delivered-lost-without-you",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/signed-sealed-delivered"],
  position: 9,
  publishedAt: "2016-09-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "414762",
      externalLink: "https://www.themoviedb.org/movie/414762",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Signed, Sealed, Delivered: Lost Without You",
  genres: ["Drama", "TV Movie", "Comedy"],
  imdbId: "tt6047684",
  posterPath: "/u7LaDx0TI9KWkhlIV5p9vegq2yD.jpg",
  voteAverage: 7.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T20:45:04.980Z",
} as const satisfies Movie
