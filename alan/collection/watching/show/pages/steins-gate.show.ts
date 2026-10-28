import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const steinsGate = {
  id: "01a183d4-f6a7-75e2-932b-5a200f01df0a",
  type: "page-type/show",
  slug: "steins-gate",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/steins-gate"],
  publishedAt: "2011-04-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "42509", externalLink: "https://www.themoviedb.org/tv/42509" },
  ],
  title: "Steins;Gate",
  createdAt: "2026-10-28T18:45:34.502Z",
  updatedAt: "2026-10-28T18:45:34.502Z",
} as const satisfies Show
