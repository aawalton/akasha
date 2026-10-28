import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const clannad = {
  id: "01a183d7-50e1-7bd5-a88f-ec8b37c2c6ca",
  type: "page-type/show",
  slug: "clannad",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/clannad"],
  publishedAt: "2007-10-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "24835", externalLink: "https://www.themoviedb.org/tv/24835" },
  ],
  title: "Clannad",
  createdAt: "2026-10-28T18:48:08.670Z",
  updatedAt: "2026-10-28T18:48:08.670Z",
} as const satisfies Show
