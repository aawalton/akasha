import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const prudence = {
  id: "01a17497-195b-782f-8608-410c0601953a",
  type: "page-type/franchise",
  slug: "prudence",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "726479",
      externalLink: "https://www.themoviedb.org/collection/726479",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Prudence",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
