import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const signedSealedDeliveredFromTheHeart = {
  id: "01a17499-a7d7-7603-bd27-2a5b2d36851b",
  type: "page-type/movie",
  slug: "signed-sealed-delivered-from-the-heart",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/signed-sealed-delivered"],
  position: 7,
  publishedAt: "2016-02-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "379992",
      externalLink: "https://www.themoviedb.org/movie/379992",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Signed, Sealed, Delivered: From The Heart",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt5496244",
  posterPath: "/8KKfV5pPq6RETbEzLDHYYwAqN9m.jpg",
  voteAverage: 7.3,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
