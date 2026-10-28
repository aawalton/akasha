import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const toradora = {
  id: "01a183d9-26d9-73df-893f-cba5b56458f4",
  type: "page-type/show",
  slug: "toradora",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/toradora"],
  publishedAt: "2008-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "42916", externalLink: "https://www.themoviedb.org/tv/42916" },
  ],
  title: "Toradora!",
  createdAt: "2026-10-28T18:50:08.982Z",
  updatedAt: "2026-10-28T18:50:08.982Z",
} as const satisfies Show
