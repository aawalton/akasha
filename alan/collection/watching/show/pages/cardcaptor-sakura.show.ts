import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const cardcaptorSakura = {
  id: "01a183db-217d-7a6c-8f90-8ca9bf981dc7",
  type: "page-type/show",
  slug: "cardcaptor-sakura",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/cardcaptor-sakura"],
  publishedAt: "1998-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "35790", externalLink: "https://www.themoviedb.org/tv/35790" },
  ],
  title: "Cardcaptor Sakura",
  createdAt: "2026-10-28T18:52:18.678Z",
  updatedAt: "2026-10-28T18:52:18.678Z",
} as const satisfies Show
