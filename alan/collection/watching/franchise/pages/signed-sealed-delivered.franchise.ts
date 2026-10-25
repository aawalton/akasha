import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const signedSealedDelivered = {
  id: "01a17497-195b-792f-8aad-1e6767a37645",
  type: "page-type/franchise",
  slug: "signed-sealed-delivered",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "418326",
      externalLink: "https://www.themoviedb.org/collection/418326",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Signed Sealed Delivered",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
