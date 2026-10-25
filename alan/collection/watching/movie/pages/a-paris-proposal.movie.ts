import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aParisProposal = {
  id: "01a1749a-66bb-7820-b04c-0864e68e2cac",
  type: "page-type/movie",
  slug: "a-paris-proposal",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-02-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1068818",
      externalLink: "https://www.themoviedb.org/movie/1068818",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Paris Proposal",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt25391064",
  posterPath: "/le660GO6PxvUwsn9yD8TBdEghGc.jpg",
  voteAverage: 6.1,
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
