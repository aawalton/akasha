import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const trueJusticeEyeForAnEye = {
  id: "01a1749a-c86c-7628-8876-0f9f1fa6e62a",
  type: "page-type/movie",
  slug: "true-justice-eye-for-an-eye",
  ownLength: 124,
  ownProgress: 0,
  partOfCollections: ["franchise/true-justice"],
  position: 2,
  publishedAt: "2026-05-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1594520",
      externalLink: "https://www.themoviedb.org/movie/1594520",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "True Justice: Eye for an Eye",
  genres: ["Crime", "Mystery", "Drama", "TV Movie"],
  imdbId: "tt35495023",
  posterPath: "/rcKD1DBuJzC8T35UD4KKFrXZI9n.jpg",
  voteAverage: 6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T20:45:31.132Z",
} as const satisfies Movie
