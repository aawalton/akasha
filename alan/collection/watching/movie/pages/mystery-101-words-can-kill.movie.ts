import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mystery101WordsCanKill = {
  id: "01a1749a-06be-72a7-aa9d-8c87aa17de32",
  type: "page-type/movie",
  slug: "mystery-101-words-can-kill",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/mystery-101"],
  position: 2,
  publishedAt: "2019-09-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "620744",
      externalLink: "https://www.themoviedb.org/movie/620744",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystery 101: Words Can Kill",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt10709048",
  posterPath: "/vp1AgRE4nRwO6ceooNuglOQQQNL.jpg",
  voteAverage: 7.737,
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
