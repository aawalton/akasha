import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const signedSealedDeliveredOneInAMillion = {
  id: "01a17499-a7d7-701f-bcd9-19b5079d21ee",
  type: "page-type/movie",
  slug: "signed-sealed-delivered-one-in-a-million",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/signed-sealed-delivered"],
  position: 7,
  publishedAt: "2016-07-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "407171",
      externalLink: "https://www.themoviedb.org/movie/407171",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Signed, Sealed, Delivered: One in a Million",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt5917230",
  posterPath: "/jsXUbL2kn6tiBZK23Nm8CPH36Wg.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
