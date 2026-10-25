import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aWhitewaterRomance = {
  id: "01a1749a-89a6-74b8-ba1e-44f948819288",
  type: "page-type/movie",
  slug: "a-whitewater-romance",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-05-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1268604",
      externalLink: "https://www.themoviedb.org/movie/1268604",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Whitewater Romance",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt27351462",
  posterPath: "/8NDtjFcNrwytYSVYDxEkV7tv7Oz.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
