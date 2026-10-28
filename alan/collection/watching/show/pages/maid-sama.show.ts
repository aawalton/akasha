import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const maidSama = {
  id: "01a183da-f59b-7757-9013-ea4fa5d7c284",
  type: "page-type/show",
  slug: "maid-sama",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/maid-sama"],
  publishedAt: "2010-04-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "65648", externalLink: "https://www.themoviedb.org/tv/65648" },
  ],
  title: "Maid Sama!",
  createdAt: "2026-10-28T18:52:07.450Z",
  updatedAt: "2026-10-28T18:52:07.450Z",
} as const satisfies Show
