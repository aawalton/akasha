import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const youReBaconMeCrazy = {
  id: "01a1749a-06c0-703e-a8f0-582b2b9d21da",
  type: "page-type/movie",
  slug: "you-re-bacon-me-crazy",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-04-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "677209",
      externalLink: "https://www.themoviedb.org/movie/677209",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "You're Bacon Me Crazy",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt11348950",
  posterPath: "/e6FSxn0Myqq3uffXjdZXpOTGCn4.jpg",
  voteAverage: 6.7,
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
