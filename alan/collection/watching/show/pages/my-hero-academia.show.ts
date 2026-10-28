import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const myHeroAcademia = {
  id: "01a183d4-accc-791e-aa89-584e8bfdf927",
  type: "page-type/show",
  slug: "my-hero-academia",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/my-hero-academia"],
  publishedAt: "2016-04-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "65930", externalLink: "https://www.themoviedb.org/tv/65930" },
  ],
  title: "My Hero Academia",
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Show
