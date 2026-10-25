import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const signedSealedDeliveredHigherGround = {
  id: "01a17499-c95f-7d23-972f-9dee75a167e7",
  type: "page-type/movie",
  slug: "signed-sealed-delivered-higher-ground",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/signed-sealed-delivered"],
  position: 10,
  publishedAt: "2017-02-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "438573",
      externalLink: "https://www.themoviedb.org/movie/438573",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Signed, Sealed, Delivered: Higher Ground",
  genres: ["Romance", "TV Movie", "Drama"],
  imdbId: "tt6568874",
  posterPath: "/dRDGYBPppvrLr7FGKD09jIujR9G.jpg",
  voteAverage: 7.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T20:45:07.643Z",
} as const satisfies Movie
