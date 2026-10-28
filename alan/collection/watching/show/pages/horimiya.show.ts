import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const horimiya = {
  id: "01a183d8-71ac-7d23-841d-345e1f2e94cf",
  type: "page-type/show",
  slug: "horimiya",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/horimiya"],
  publishedAt: "2021-01-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "110070", externalLink: "https://www.themoviedb.org/tv/110070" },
  ],
  title: "Horimiya",
  createdAt: "2026-10-28T18:49:22.603Z",
  updatedAt: "2026-10-28T18:49:22.603Z",
} as const satisfies Show
