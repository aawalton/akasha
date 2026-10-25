import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const realityBitesAHannahSwensenMystery = {
  id: "01a1749a-c86a-7c7d-9bb4-880e3912b7e2",
  type: "page-type/movie",
  slug: "reality-bites-a-hannah-swensen-mystery",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/hannah-swensen-mysteries"],
  position: 10,
  publishedAt: "2025-02-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1414157",
      externalLink: "https://www.themoviedb.org/movie/1414157",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Reality Bites: A Hannah Swensen Mystery",
  genres: ["Mystery", "Drama", "TV Movie"],
  imdbId: "tt35304909",
  posterPath: "/yf5VehJTvUh0mIcKVv0mTSWhCkk.jpg",
  voteAverage: 7.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
