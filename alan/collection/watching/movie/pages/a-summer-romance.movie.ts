import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aSummerRomance = {
  id: "01a17499-e801-7e2e-8f7b-2db7a2fc0f4f",
  type: "page-type/movie",
  slug: "a-summer-romance",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-08-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "612315",
      externalLink: "https://www.themoviedb.org/movie/612315",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Summer Romance",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt10224134",
  posterPath: "/nYGLSQElCEkf8mA63KzKf2qTEXD.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
