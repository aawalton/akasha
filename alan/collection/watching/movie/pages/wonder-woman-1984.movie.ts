import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const wonderWoman1984 = {
  id: "01a06802-6d9a-702c-82c2-628e48df1737",
  type: "page-type/movie",
  slug: "wonder-woman-1984",
  title: "Wonder Woman 1984",
  partOfCollections: ["fandom/dc-extended-universe"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-12-25",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/wonder-woman-1984-2020",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
