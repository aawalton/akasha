import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveOnTheRightCourse = {
  id: "01a1749a-89a9-7286-8a65-75abd7ecb146",
  type: "page-type/movie",
  slug: "love-on-the-right-course",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-01-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1212661",
      externalLink: "https://www.themoviedb.org/movie/1212661",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love on the Right Course",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt30143873",
  posterPath: "/iHTGbieCY8R9CORdA4s2EalrbDQ.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
