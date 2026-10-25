import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const haileyDeanMysteryMurderWithLove = {
  id: "01a17499-a7d5-79db-b402-ea66f74d5a83",
  type: "page-type/movie",
  slug: "hailey-dean-mystery-murder-with-love",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/hailey-dean-mysteries"],
  position: 0,
  publishedAt: "2016-10-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "422842",
      externalLink: "https://www.themoviedb.org/movie/422842",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Hailey Dean Mystery: Murder, With Love",
  genres: ["TV Movie", "Mystery"],
  imdbId: "tt6203026",
  posterPath: "/dMYCo0WGq3dmRQAxodGfVSi5MU.jpg",
  voteAverage: 7.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
