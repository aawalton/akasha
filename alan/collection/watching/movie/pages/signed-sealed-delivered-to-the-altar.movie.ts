import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const signedSealedDeliveredToTheAltar = {
  id: "01a17499-e806-7c54-a0b7-cab3c078de37",
  type: "page-type/movie",
  slug: "signed-sealed-delivered-to-the-altar",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/signed-sealed-delivered"],
  position: 13,
  publishedAt: "2018-07-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "526089",
      externalLink: "https://www.themoviedb.org/movie/526089",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Signed, Sealed, Delivered: To the Altar",
  genres: ["Drama", "Comedy", "Mystery", "TV Movie"],
  imdbId: "tt8497680",
  posterPath: "/7wJod9ETta3AOMNsFzqyMLjLGDf.jpg",
  voteAverage: 7.205,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
