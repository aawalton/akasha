import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const madeInAbyssMezameruShinpi = {
  id: "01a183dd-196a-7a2d-93a0-1d1f0c8fad2d",
  type: "page-type/movie",
  slug: "made-in-abyss-mezameru-shinpi",
  ownLength: 71,
  ownProgress: 0,
  partOfCollections: ["fandom/made-in-abyss"],
  publishedAt: "2026-10-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1526917",
      externalLink: "https://www.themoviedb.org/movie/1526917",
    },
  ],
  title: "Made in Abyss: Mezameru Shinpi",
  createdAt: "2026-10-28T18:54:27.690Z",
  updatedAt: "2026-10-28T18:54:27.690Z",
} as const satisfies Movie
