import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const garageSaleMysteries = {
  id: "01a17497-1959-7b5e-aadd-f8cc6c7958ea",
  type: "page-type/franchise",
  slug: "garage-sale-mysteries",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "353792",
      externalLink: "https://www.themoviedb.org/collection/353792",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Garage Sale Mysteries",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
