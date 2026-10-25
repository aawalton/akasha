import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const highFlyingRomance = {
  id: "01a1749a-464b-707c-a458-2bf12ec67e27",
  type: "page-type/movie",
  slug: "high-flying-romance",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-08-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "784393",
      externalLink: "https://www.themoviedb.org/movie/784393",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "High Flying Romance",
  genres: ["Romance", "Drama"],
  imdbId: "tt12529748",
  posterPath: "/wOM7rLPbsF1wMCHeg89mO8Jfbhh.jpg",
  voteAverage: 7.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
