import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aHolidaySpectacular = {
  id: "01a1749a-4648-70b9-b2d7-2a60cf40ee5a",
  type: "page-type/movie",
  slug: "a-holiday-spectacular",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "996767",
      externalLink: "https://www.themoviedb.org/movie/996767",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Holiday Spectacular",
  genres: ["TV Movie", "Romance", "Comedy", "Fantasy"],
  imdbId: "tt18361702",
  posterPath: "/sVMkBrL3jqu0COYqwGn2xLoEWV.jpg",
  voteAverage: 5.946,
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
