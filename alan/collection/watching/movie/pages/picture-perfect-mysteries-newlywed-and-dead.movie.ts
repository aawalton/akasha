import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const picturePerfectMysteriesNewlywedAndDead = {
  id: "01a1749a-06bf-7d84-acfe-2f5b1f9d028e",
  type: "page-type/movie",
  slug: "picture-perfect-mysteries-newlywed-and-dead",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["franchise/picture-perfect-mysteries"],
  position: 0,
  publishedAt: "2019-06-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "603085",
      externalLink: "https://www.themoviedb.org/movie/603085",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Picture Perfect Mysteries: Newlywed and Dead",
  genres: ["TV Movie", "Crime", "Mystery"],
  imdbId: "tt8582458",
  posterPath: "/yUwzclWg9y0HxaETZcnu5ta3azU.jpg",
  voteAverage: 7.4,
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
