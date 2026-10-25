import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const groundswell = {
  id: "01a1749a-66bd-7193-8197-701e0039007a",
  type: "page-type/movie",
  slug: "groundswell",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2022-08-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "990009",
      externalLink: "https://www.themoviedb.org/movie/990009",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Groundswell",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt20562474",
  posterPath: "/grTEghnEsv9NSWEDzcU3OrPINVk.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
