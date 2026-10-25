import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const sisterSwap = {
  id: "01a17497-195b-75ef-9b7c-1882b8413f76",
  type: "page-type/franchise",
  slug: "sister-swap",
  partOfCollections: ["show-collection/hallmark-christmas"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "895106",
      externalLink: "https://www.themoviedb.org/collection/895106",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Sister Swap",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
