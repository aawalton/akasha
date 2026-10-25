import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const morningShowMysteriesCountdownToMurder = {
  id: "01a1749a-06bd-79ec-8b82-0515bdc45005",
  type: "page-type/movie",
  slug: "morning-show-mysteries-countdown-to-murder",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/morning-show-mysteries"],
  position: 3,
  publishedAt: "2019-04-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "594628",
      externalLink: "https://www.themoviedb.org/movie/594628",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Morning Show Mysteries: Countdown to Murder",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt10189570",
  posterPath: "/kjyQSbIpbWTtQNEdnvbccQ1f0Xk.jpg",
  voteAverage: 6.205,
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
