import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const signedSealedDeliveredTheVowsWeHaveMade = {
  id: "01a1749a-464d-70cb-b375-2833916c8963",
  type: "page-type/movie",
  slug: "signed-sealed-delivered-the-vows-we-have-made",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/signed-sealed-delivered"],
  position: 14,
  publishedAt: "2021-10-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "860271",
      externalLink: "https://www.themoviedb.org/movie/860271",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Signed, Sealed, Delivered: The Vows We Have Made",
  genres: ["TV Movie", "Romance", "Comedy", "Mystery"],
  imdbId: "tt15214870",
  posterPath: "/b1BpnHcmaXXGbsKRDKIyJJueNeH.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
