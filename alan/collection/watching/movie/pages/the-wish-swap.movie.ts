import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theWishSwap = {
  id: "01a1749a-a94e-7e8b-a42a-a9fc7d66ba61",
  type: "page-type/movie",
  slug: "the-wish-swap",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2025-02-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1413196",
      externalLink: "https://www.themoviedb.org/movie/1413196",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Wish Swap",
  genres: ["Romance"],
  imdbId: "tt34748584",
  posterPath: "/tL0gzunQrFuATf9OhxIEzrHgAZF.jpg",
  voteAverage: 7.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
