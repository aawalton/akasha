import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const bananaFish = {
  id: "01a183dd-ecbb-7d1b-871e-0e3e72c479e2",
  type: "page-type/show",
  slug: "banana-fish",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/banana-fish"],
  publishedAt: "2018-07-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "80564", externalLink: "https://www.themoviedb.org/tv/80564" },
  ],
  title: "Banana Fish",
  createdAt: "2026-10-28T18:55:21.786Z",
  updatedAt: "2026-10-28T18:55:21.786Z",
} as const satisfies Show
