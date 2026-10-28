import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const rascalDoesNotDreamOfASisterVenturingOut = {
  id: "01a183d5-ad03-7e21-8cd2-b1d2c471003b",
  type: "page-type/movie",
  slug: "rascal-does-not-dream-of-a-sister-venturing-out",
  ownLength: 74,
  ownProgress: 0,
  partOfCollections: ["fandom/rascal-does-not-dream"],
  publishedAt: "2023-06-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1056803",
      externalLink: "https://www.themoviedb.org/movie/1056803",
    },
  ],
  title: "Rascal Does Not Dream of a Sister Venturing Out",
  createdAt: "2026-10-28T18:46:21.187Z",
  updatedAt: "2026-10-28T18:46:21.187Z",
} as const satisfies Movie
