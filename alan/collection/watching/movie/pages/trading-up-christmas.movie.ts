import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const tradingUpChristmas = {
  id: "01a1749a-a94e-75dd-946f-c98db8b8a4cd",
  type: "page-type/movie",
  slug: "trading-up-christmas",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-12-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1361255",
      externalLink: "https://www.themoviedb.org/movie/1361255",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Trading Up Christmas",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt33906572",
  posterPath: "/gPVr3AjMvuWNzW8GyynIWNuXFyA.jpg",
  voteAverage: 6.5,
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
