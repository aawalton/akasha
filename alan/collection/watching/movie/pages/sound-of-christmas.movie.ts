import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const soundOfChristmas = {
  id: "01a17499-a7d7-73ea-b20d-ab1895a00167",
  type: "page-type/movie",
  slug: "sound-of-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2016-12-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "423891",
      externalLink: "https://www.themoviedb.org/movie/423891",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Sound of Christmas",
  genres: ["TV Movie", "Drama"],
  imdbId: "tt6260218",
  posterPath: "/8NZrtqOfHb5f29WI5ycOk90Ivuk.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
