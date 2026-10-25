import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aFamilyChristmasGift = {
  id: "01a1749a-06b9-7903-a086-2850d9209150",
  type: "page-type/movie",
  slug: "a-family-christmas-gift",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-12-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "631414",
      externalLink: "https://www.themoviedb.org/movie/631414",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Family Christmas Gift",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt10926390",
  posterPath: "/j4tyVRs2wQqSAGSUP2OQEGvrkyv.jpg",
  voteAverage: 6.2,
  streamingOn: ["Philo", "fuboTV"],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
