import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const doubleBookedForTheHolidays = {
  id: "01a1749a-c868-7861-9e89-f81620aeddb8",
  type: "page-type/movie",
  slug: "double-booked-for-the-holidays",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-11-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773329",
      externalLink: "https://www.themoviedb.org/movie/1773329",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Double Booked for the Holidays",
  genres: ["Romance"],
  imdbId: "tt46064711",
  posterPath: "/wbPUMupk9mmFcjDsdbFR4dszY6J.jpg",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
