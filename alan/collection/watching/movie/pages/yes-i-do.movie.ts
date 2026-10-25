import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const yesIDo = {
  id: "01a17499-c960-7fa6-8b67-c45cc81d58cd",
  type: "page-type/movie",
  slug: "yes-i-do",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2018-06-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "529250",
      externalLink: "https://www.themoviedb.org/movie/529250",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Yes, I Do",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt8319098",
  posterPath: "/bGucFJGHeTqrK5Au4rYFzaZ8JIz.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Tubi TV",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
