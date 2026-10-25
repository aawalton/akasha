import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const boyfriendsOfChristmasPast = {
  id: "01a1749a-2599-7dea-a654-6521f8568cd2",
  type: "page-type/movie",
  slug: "boyfriends-of-christmas-past",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-10-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874162",
      externalLink: "https://www.themoviedb.org/movie/874162",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Boyfriends of Christmas Past",
  genres: ["Comedy", "Romance", "TV Movie", "Drama"],
  imdbId: "tt15706104",
  posterPath: "/1AtCO9ZLk0yOolkabEj3TFfBpSB.jpg",
  voteAverage: 5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
