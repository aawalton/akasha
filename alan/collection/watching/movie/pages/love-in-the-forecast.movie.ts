import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveInTheForecast = {
  id: "01a1749a-06bd-7620-86ef-c1bfd741fdb1",
  type: "page-type/movie",
  slug: "love-in-the-forecast",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-06-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "696817",
      externalLink: "https://www.themoviedb.org/movie/696817",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love in the Forecast",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt11836852",
  posterPath: "/jM2D5NgBvl7ifSJ5PsreYAxO9vA.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
