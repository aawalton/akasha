import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const hanukkahOnRye = {
  id: "01a1749a-66be-7217-9b54-ac060b3ab19c",
  type: "page-type/movie",
  slug: "hanukkah-on-rye",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-12-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028555",
      externalLink: "https://www.themoviedb.org/movie/1028555",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Hanukkah on Rye",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt22307422",
  posterPath: "/oeVO65IjVBlMwObN2LSFCsoLlz1.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
