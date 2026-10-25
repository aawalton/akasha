import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mystery101DeadTalk = {
  id: "01a1749a-06be-761b-b609-d05c965af946",
  type: "page-type/movie",
  slug: "mystery-101-dead-talk",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/mystery-101"],
  position: 4,
  publishedAt: "2019-09-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "620743",
      externalLink: "https://www.themoviedb.org/movie/620743",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystery 101: Dead Talk",
  genres: ["Crime", "Mystery", "TV Movie"],
  imdbId: "tt10709058",
  posterPath: "/5qyj1YwuMhZRey0dgRLQV9arNgf.jpg",
  voteAverage: 7.307,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T20:45:13.587Z",
} as const satisfies Movie
