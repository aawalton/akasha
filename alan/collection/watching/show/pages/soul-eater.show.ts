import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const soulEater = {
  id: "01a183d9-1621-7a71-ac33-c2cd9ba6bae7",
  type: "page-type/show",
  slug: "soul-eater",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/soul-eater"],
  publishedAt: "2008-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "37305", externalLink: "https://www.themoviedb.org/tv/37305" },
  ],
  title: "Soul Eater",
  createdAt: "2026-10-28T18:50:04.702Z",
  updatedAt: "2026-10-28T18:50:04.702Z",
} as const satisfies Show
