import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const twoTicketsToParadise = {
  id: "01a1749a-464e-7064-b1fd-f2bb7ce41f72",
  type: "page-type/movie",
  slug: "two-tickets-to-paradise",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-06-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "964403",
      externalLink: "https://www.themoviedb.org/movie/964403",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Two Tickets to Paradise",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt19733952",
  posterPath: "/q5hbXUl8O2A8PKDCe6bJcKTeiPk.jpg",
  voteAverage: 6.905,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
