import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aChristmasMiracle = {
  id: "01a1749a-06b9-778d-a319-953a7f8ac1d4",
  type: "page-type/movie",
  slug: "a-christmas-miracle",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-11-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "631402",
      externalLink: "https://www.themoviedb.org/movie/631402",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Christmas Miracle",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10922620",
  posterPath: "/zdjLTyL40dNwhwPucHCLf82yOO2.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
