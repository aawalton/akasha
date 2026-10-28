import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const darlingInTheFranxx = {
  id: "01a183dd-af81-7d58-841a-669969d77b62",
  type: "page-type/show",
  slug: "darling-in-the-franxx",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/darling-in-the-franxx"],
  publishedAt: "2018-01-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "76121", externalLink: "https://www.themoviedb.org/tv/76121" },
  ],
  title: "DARLING in the FRANXX",
  createdAt: "2026-10-28T18:55:06.111Z",
  updatedAt: "2026-10-28T18:55:06.111Z",
} as const satisfies Show
