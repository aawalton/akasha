import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const nana = {
  id: "01a183d5-677a-79a7-81a4-047e8bce31b6",
  type: "page-type/show",
  slug: "nana",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/nana"],
  publishedAt: "2006-04-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "56568", externalLink: "https://www.themoviedb.org/tv/56568" },
  ],
  title: "NANA",
  createdAt: "2026-10-28T18:46:03.381Z",
  updatedAt: "2026-10-28T18:46:03.381Z",
} as const satisfies Show
