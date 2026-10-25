import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const haileyDeanMysteryDeadlyEstate = {
  id: "01a17499-c95d-7b72-b578-750c7f4d7cca",
  type: "page-type/movie",
  slug: "hailey-dean-mystery-deadly-estate",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/hailey-dean-mysteries"],
  position: 2,
  publishedAt: "2017-04-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "446865",
      externalLink: "https://www.themoviedb.org/movie/446865",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Hailey Dean Mystery: Deadly Estate",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt6697760",
  posterPath: "/kyvLlETDaZ0t08eT7oCBKWGMhLN.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T20:45:07.643Z",
} as const satisfies Movie
