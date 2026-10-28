import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const violetEvergarden = {
  id: "01a183d5-4982-77c2-8fd2-e48b10a70c1f",
  type: "page-type/show",
  slug: "violet-evergarden",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/violet-evergarden"],
  publishedAt: "2018-01-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "75214", externalLink: "https://www.themoviedb.org/tv/75214" },
  ],
  title: "Violet Evergarden",
  createdAt: "2026-10-28T18:45:55.713Z",
  updatedAt: "2026-10-28T18:45:55.713Z",
} as const satisfies Show
