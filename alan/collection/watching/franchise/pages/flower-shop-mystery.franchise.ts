import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const flowerShopMystery = {
  id: "01a17497-1959-728e-96e5-46702c07321f",
  type: "page-type/franchise",
  slug: "flower-shop-mystery",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "401119",
      externalLink: "https://www.themoviedb.org/collection/401119",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Flower Shop Mystery",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
