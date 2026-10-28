import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const drStone = {
  id: "01a183d9-8fc5-7ad6-908d-f0bcbaad30c9",
  type: "page-type/show",
  slug: "dr-stone",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/dr-stone"],
  publishedAt: "2019-07-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "86031", externalLink: "https://www.themoviedb.org/tv/86031" },
  ],
  title: "Dr. STONE",
  createdAt: "2026-10-28T18:50:35.838Z",
  updatedAt: "2026-10-28T18:50:35.838Z",
} as const satisfies Show
