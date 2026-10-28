import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const fullmetalAlchemist = {
  id: "01a183d2-7f42-76c2-8288-843fd6edc2a4",
  type: "page-type/show",
  slug: "fullmetal-alchemist",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/fullmetal-alchemist"],
  publishedAt: "2003-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "37863", externalLink: "https://www.themoviedb.org/tv/37863" },
  ],
  title: "Fullmetal Alchemist",
  createdAt: "2026-10-28T18:42:52.863Z",
  updatedAt: "2026-10-28T18:42:52.863Z",
} as const satisfies Show
