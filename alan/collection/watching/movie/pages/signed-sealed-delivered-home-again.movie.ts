import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const signedSealedDeliveredHomeAgain = {
  id: "01a17499-c95f-7fad-b3ba-314dad25c27e",
  type: "page-type/movie",
  slug: "signed-sealed-delivered-home-again",
  ownLength: 81,
  ownProgress: 0,
  partOfCollections: ["franchise/signed-sealed-delivered"],
  position: 10,
  publishedAt: "2017-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "473896",
      externalLink: "https://www.themoviedb.org/movie/473896",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Signed, Sealed, Delivered: Home Again",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt7373264",
  posterPath: "/2Z5vO7xJ43qK8bBzdxV7fQvpfbI.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
