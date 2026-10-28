import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const madeInAbyssDawnOfTheDeepSoul = {
  id: "01a183dd-1297-734b-a847-55e05abc6636",
  type: "page-type/movie",
  slug: "made-in-abyss-dawn-of-the-deep-soul",
  ownLength: 105,
  ownProgress: 0,
  partOfCollections: ["fandom/made-in-abyss"],
  publishedAt: "2020-01-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "573730",
      externalLink: "https://www.themoviedb.org/movie/573730",
    },
  ],
  title: "Made in Abyss: Dawn of the Deep Soul",
  createdAt: "2026-10-28T18:54:25.943Z",
  updatedAt: "2026-10-28T18:54:25.943Z",
} as const satisfies Movie
