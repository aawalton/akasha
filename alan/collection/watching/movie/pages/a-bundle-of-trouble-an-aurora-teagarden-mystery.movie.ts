import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aBundleOfTroubleAnAuroraTeagardenMystery = {
  id: "01a17499-c959-75bb-a325-c1cbde498ee4",
  type: "page-type/movie",
  slug: "a-bundle-of-trouble-an-aurora-teagarden-mystery",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/aurora-teagarden-mystery"],
  position: 6,
  publishedAt: "2017-05-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "455034",
      externalLink: "https://www.themoviedb.org/movie/455034",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Bundle of Trouble: An Aurora Teagarden Mystery",
  genres: ["Mystery", "TV Movie", "Drama", "Crime"],
  imdbId: "tt6760562",
  posterPath: "/5855wwOnhlfK2cBHwA46KCwVFva.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
