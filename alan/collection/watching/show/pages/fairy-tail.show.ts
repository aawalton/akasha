import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const fairyTail = {
  id: "01a183d7-2660-729f-b9a8-41b80de10be4",
  type: "page-type/show",
  slug: "fairy-tail",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/fairy-tail"],
  publishedAt: "2009-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "46261", externalLink: "https://www.themoviedb.org/tv/46261" },
  ],
  title: "Fairy Tail",
  createdAt: "2026-10-28T18:47:57.774Z",
  updatedAt: "2026-10-28T18:47:57.774Z",
} as const satisfies Show
