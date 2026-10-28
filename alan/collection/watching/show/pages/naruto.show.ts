import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const naruto = {
  id: "01a183d1-bb62-7b2a-a147-0a75d7e20d64",
  type: "page-type/show",
  slug: "naruto",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/naruto"],
  publishedAt: "2002-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "46260", externalLink: "https://www.themoviedb.org/tv/46260" },
  ],
  title: "Naruto",
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Show
