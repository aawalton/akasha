import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const parasyteTheMaxim = {
  id: "01a183dd-882c-7061-964f-d35c91e5c659",
  type: "page-type/show",
  slug: "parasyte-the-maxim",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/parasyte"],
  publishedAt: "2014-10-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "61459",
      externalLink: "https://www.themoviedb.org/tv/61459",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Parasyte -the maxim-",
  streamingOn: ["HiDive", "Hidive Amazon Channel"],
  createdAt: "2026-10-28T18:54:56.042Z",
  updatedAt: "2026-10-28T19:45:37.230Z",
} as const satisfies Show
