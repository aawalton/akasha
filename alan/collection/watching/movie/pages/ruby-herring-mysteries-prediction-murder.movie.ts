import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const rubyHerringMysteriesPredictionMurder = {
  id: "01a1749a-259d-712c-8a5d-2e6c3cd6280c",
  type: "page-type/movie",
  slug: "ruby-herring-mysteries-prediction-murder",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/ruby-herring-mysteries"],
  position: 2,
  publishedAt: "2020-04-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "681632",
      externalLink: "https://www.themoviedb.org/movie/681632",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Ruby Herring Mysteries: Prediction Murder",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt11686304",
  posterPath: "/41FDwR0pnYZSmf5SBLkh3MBg2IV.jpg",
  voteAverage: 7.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
