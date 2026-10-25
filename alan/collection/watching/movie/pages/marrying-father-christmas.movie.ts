import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const marryingFatherChristmas = {
  id: "01a17499-e804-7823-9c98-bb2a4761cdea",
  type: "page-type/movie",
  slug: "marrying-father-christmas",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/father-christmas"],
  position: 3,
  publishedAt: "2018-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "549304",
      externalLink: "https://www.themoviedb.org/movie/549304",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Marrying Father Christmas",
  genres: ["Romance", "Drama", "TV Movie"],
  imdbId: "tt8022676",
  posterPath: "/s8JXJ41ayx5zxKcQMHsliSvA7xC.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "The Roku Channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T20:45:10.655Z",
} as const satisfies Movie
