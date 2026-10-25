import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theMoreTheMerrier = {
  id: "01a1749a-a94d-7872-b7e2-a58120abfc73",
  type: "page-type/movie",
  slug: "the-more-the-merrier",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2025-11-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1546001",
      externalLink: "https://www.themoviedb.org/movie/1546001",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The More the Merrier",
  genres: ["Romance", "Drama", "TV Movie"],
  imdbId: "tt38354960",
  posterPath: "/3wiTWMVT6RpnMkWfW5tW39Ou8ba.jpg",
  voteAverage: 6.231,
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
