import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const bocchiTheRock = {
  id: "01a183d9-6b68-7017-b064-fe0f0b5a9503",
  type: "page-type/show",
  slug: "bocchi-the-rock",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/bocchi-the-rock"],
  publishedAt: "2022-10-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "119100", externalLink: "https://www.themoviedb.org/tv/119100" },
  ],
  title: "BOCCHI THE ROCK!",
  createdAt: "2026-10-28T18:50:26.535Z",
  updatedAt: "2026-10-28T18:50:26.535Z",
} as const satisfies Show
