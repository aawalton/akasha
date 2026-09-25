import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const wonderWoman = {
  id: "01a06802-6d9a-702b-8808-130bc01891b4",
  type: "page-type/movie",
  slug: "wonder-woman",
  title: "Wonder Woman",
  partOfCollections: ["fandom/dc-extended-universe"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-06-02",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/wonder-woman-2017",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
