import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const haileyDeanMysteriesAPrescriptionForMurder = {
  id: "01a1749a-06bc-76c8-acd9-18bd2fa44f9b",
  type: "page-type/movie",
  slug: "hailey-dean-mysteries-a-prescription-for-murder",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/hailey-dean-mysteries"],
  position: 8,
  publishedAt: "2019-05-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "594633",
      externalLink: "https://www.themoviedb.org/movie/594633",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Hailey Dean Mysteries: A Prescription for Murder",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt10244898",
  posterPath: "/2cQx78AlZaD8ovnbJfjcWPWDS97.jpg",
  voteAverage: 7,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
