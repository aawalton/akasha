import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const noGameNoLife = {
  id: "01a183dd-2716-7000-a762-769b1c771cab",
  type: "page-type/show",
  slug: "no-game-no-life",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/no-game-no-life"],
  publishedAt: "2014-04-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "60808", externalLink: "https://www.themoviedb.org/tv/60808" },
  ],
  title: "No Game No Life",
  createdAt: "2026-10-28T18:54:31.189Z",
  updatedAt: "2026-10-28T18:54:31.189Z",
} as const satisfies Show
