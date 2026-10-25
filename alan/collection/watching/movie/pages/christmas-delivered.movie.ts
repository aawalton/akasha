import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasDelivered = {
  id: "01a1749a-c868-7480-ad2c-94a1a1866bf8",
  type: "page-type/movie",
  slug: "christmas-delivered",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773322",
      externalLink: "https://www.themoviedb.org/movie/1773322",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Delivered",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt41442843",
  posterPath: "/nqaVaz8wTUwV2UNjjxJ46CjEaqV.jpg",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
