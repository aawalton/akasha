import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const hunterXHunter = {
  id: "01a183d3-3a68-70de-a983-aca53cdd69e7",
  type: "page-type/show",
  slug: "hunter-x-hunter",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/hunter-x-hunter"],
  publishedAt: "2011-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "46298", externalLink: "https://www.themoviedb.org/tv/46298" },
  ],
  title: "Hunter x Hunter",
  createdAt: "2026-10-28T18:43:40.765Z",
  updatedAt: "2026-10-28T18:43:40.765Z",
} as const satisfies Show
