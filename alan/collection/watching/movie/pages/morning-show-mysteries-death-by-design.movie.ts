import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const morningShowMysteriesDeathByDesign = {
  id: "01a1749a-06bd-74cb-ba0a-fb56f054511b",
  type: "page-type/movie",
  slug: "morning-show-mysteries-death-by-design",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/morning-show-mysteries"],
  position: 4,
  publishedAt: "2019-04-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "594630",
      externalLink: "https://www.themoviedb.org/movie/594630",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Morning Show Mysteries: Death by Design",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt10228590",
  posterPath: "/5iEvDs7SXsa2ikq6UgkkYpvAbi6.jpg",
  voteAverage: 7,
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
