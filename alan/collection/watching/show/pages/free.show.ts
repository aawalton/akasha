import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const free = {
  id: "01a183d7-ce6d-78f0-8485-e359bd61d34f",
  type: "page-type/show",
  slug: "free",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/free"],
  publishedAt: "2013-07-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "61456", externalLink: "https://www.themoviedb.org/tv/61456" },
  ],
  title: "Free!",
  createdAt: "2026-10-28T18:48:40.810Z",
  updatedAt: "2026-10-28T18:48:40.810Z",
} as const satisfies Show
