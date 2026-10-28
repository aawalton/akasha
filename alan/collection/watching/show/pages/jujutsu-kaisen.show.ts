import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const jujutsuKaisen = {
  id: "01a183d3-532c-72fd-a26e-f5931d136906",
  type: "page-type/show",
  slug: "jujutsu-kaisen",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/jujutsu-kaisen"],
  publishedAt: "2020-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "95479", externalLink: "https://www.themoviedb.org/tv/95479" },
  ],
  title: "JUJUTSU KAISEN",
  createdAt: "2026-10-28T18:43:47.111Z",
  updatedAt: "2026-10-28T18:43:47.111Z",
} as const satisfies Show
