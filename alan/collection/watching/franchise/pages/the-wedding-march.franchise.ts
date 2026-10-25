import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const theWeddingMarch = {
  id: "01a17497-195c-7a28-813a-90d81896d61b",
  type: "page-type/franchise",
  slug: "the-wedding-march",
  partOfCollections: ["show-collection/hallmark-romance"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "521615",
      externalLink: "https://www.themoviedb.org/collection/521615",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Wedding March",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
