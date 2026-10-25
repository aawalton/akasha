import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const oneWinterProposal = {
  id: "01a17499-e805-743d-bfef-ef3abdba2155",
  type: "page-type/movie",
  slug: "one-winter-proposal",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/one-winter"],
  position: 1,
  publishedAt: "2019-01-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "570189",
      externalLink: "https://www.themoviedb.org/movie/570189",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "One Winter Proposal",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt9534518",
  posterPath: "/zN2BkOC6oIriVyioEncgNKwJjn7.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
