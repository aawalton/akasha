import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const chronicleMysteriesHelpedToDeath = {
  id: "01a1749a-464a-7326-a314-9557fe57f199",
  type: "page-type/movie",
  slug: "chronicle-mysteries-helped-to-death",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/chronicle-mysteries"],
  position: 4,
  publishedAt: "2021-02-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "783305",
      externalLink: "https://www.themoviedb.org/movie/783305",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Chronicle Mysteries: Helped to Death",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt13246824",
  posterPath: "/5GD8v3YZj1DN1625vyv1Bn8pYCq.jpg",
  voteAverage: 7.4,
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
