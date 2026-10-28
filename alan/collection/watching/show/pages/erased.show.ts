import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const erased = {
  id: "01a183d8-0f21-74fd-a1d6-6d7452ec9de7",
  type: "page-type/show",
  slug: "erased",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/erased"],
  publishedAt: "2016-01-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "65249", externalLink: "https://www.themoviedb.org/tv/65249" },
  ],
  title: "ERASED",
  createdAt: "2026-10-28T18:48:57.376Z",
  updatedAt: "2026-10-28T18:48:57.376Z",
} as const satisfies Show
