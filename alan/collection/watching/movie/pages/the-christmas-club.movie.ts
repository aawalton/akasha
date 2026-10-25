import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasClub = {
  id: "01a1749a-06bf-7508-a359-0be774a50921",
  type: "page-type/movie",
  slug: "the-christmas-club",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "628332",
      externalLink: "https://www.themoviedb.org/movie/628332",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Christmas Club",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10667026",
  posterPath: "/sXOTaZi8uo6DLJ4G0qiL8lYgV6K.jpg",
  voteAverage: 6.264,
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
