import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const chronicleMysteriesRecovered = {
  id: "01a1749a-06bb-7db4-a9f6-4d32721b89b3",
  type: "page-type/movie",
  slug: "chronicle-mysteries-recovered",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/chronicle-mysteries"],
  position: 0,
  publishedAt: "2019-02-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "582623",
      externalLink: "https://www.themoviedb.org/movie/582623",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Chronicle Mysteries: Recovered",
  genres: ["Mystery", "Crime", "TV Movie"],
  imdbId: "tt8305372",
  posterPath: "/hUeovGYuCTTlZLnu2TgEDqkvduS.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
