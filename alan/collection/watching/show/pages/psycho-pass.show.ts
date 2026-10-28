import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const psychoPass = {
  id: "01a183da-9e73-7765-b150-9bf6360a57ef",
  type: "page-type/show",
  slug: "psycho-pass",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/psycho-pass"],
  publishedAt: "2012-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "43865", externalLink: "https://www.themoviedb.org/tv/43865" },
  ],
  title: "Psycho-Pass",
  createdAt: "2026-10-28T18:51:45.135Z",
  updatedAt: "2026-10-28T18:51:45.135Z",
} as const satisfies Show
