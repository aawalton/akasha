import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const signedSealedDeliveredForChristmas = {
  id: "01a17499-8948-734f-814c-49614356721f",
  type: "page-type/movie",
  slug: "signed-sealed-delivered-for-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/signed-sealed-delivered", "show-collection/hallmark-christmas"],
  position: 2,
  publishedAt: "2014-11-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "308686",
      externalLink: "https://www.themoviedb.org/movie/308686",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Signed, Sealed, Delivered for Christmas",
  genres: ["Family", "TV Movie"],
  imdbId: "tt4065336",
  posterPath: "/yoMg33yFaBs7JYt2pPAoe0E6q0Z.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
