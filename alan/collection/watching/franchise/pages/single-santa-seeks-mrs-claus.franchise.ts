import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const singleSantaSeeksMrsClaus = {
  id: "01a17497-195b-7d3f-87e3-48474a388feb",
  type: "page-type/franchise",
  slug: "single-santa-seeks-mrs-claus",
  partOfCollections: ["show-collection/hallmark-christmas"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "662550",
      externalLink: "https://www.themoviedb.org/collection/662550",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Single Santa Seeks Mrs. Claus",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
