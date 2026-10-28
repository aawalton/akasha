import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const skipBeat = {
  id: "01a183da-8846-766d-8803-194502fb23ba",
  type: "page-type/show",
  slug: "skip-beat",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/skip-beat"],
  publishedAt: "2008-10-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "46669", externalLink: "https://www.themoviedb.org/tv/46669" },
  ],
  title: "Skip Beat!",
  createdAt: "2026-10-28T18:51:39.460Z",
  updatedAt: "2026-10-28T18:51:39.460Z",
} as const satisfies Show
