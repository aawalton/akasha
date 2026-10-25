import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const signedSealedDeliveredFromTheHeart = {
  id: "01a17499-a7d7-7603-bd27-2a5b2d36851b",
  type: "page-type/movie",
  slug: "signed-sealed-delivered-from-the-heart",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/signed-sealed-delivered"],
  position: 6,
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
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
